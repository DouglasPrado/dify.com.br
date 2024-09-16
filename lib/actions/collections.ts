"use server";

import { getSession, withCollectionAuth, withSiteAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getBlurDataURL, nanoid } from "@/lib/utils";
import { Collection, Site, type_collection } from "@prisma/client";
import { put } from "@vercel/blob";
import { revalidateTag } from "next/cache";
import { Client } from "typesense";

const clientTypesense = new Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST as string,
      port: Number(process.env.TYPESENSE_PORT) as number,
      protocol: process.env.TYPESENSE_PROTOCOL as string,
    },
  ],
  apiKey: process.env.TYPESENSE_ADMIN_API_KEY as string,
});

const postsSchema: any = {
  enable_nested_fields: true,
  fields: [
    { name: "id", type: "string" },
    { name: "title", type: "string", optional: true },
    { name: "description", type: "string", optional: true },
    { name: "type", type: "string", optional: true, facet: true },
    { name: "image", type: "string", optional: true },
    { name: "imageBlurhash", type: "string", optional: true },
    { name: "tags", type: "string[]", optional: true, facet: true },
    { name: "collections", type: "string[]", optional: true, facet: true },
  ],
};

export const getSiteFromCollectionId = async (collectionId: string) => {
  const collection = await prisma.collection.findUnique({
    where: {
      id: collectionId,
    },
    select: {
      siteId: true,
    },
  });
  return collection?.siteId;
};

export const addProducToFromCollectionId = async (
  id: string,
  productId: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const collection = await prisma.collection.update({
    where: {
      id,
    },
    data: {
      products: { connect: [{ id: productId }] },
    },
  });
  return collection;
};

export const addPostToFromCollectionId = async (id: string, postId: string) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const collection = await prisma.collection.update({
    where: {
      id,
    },
    data: {
      posts: { connect: [{ id: postId }] },
    },
  });
  if (collection) {
    const POST_COLLECTION = `${collection.siteId}`;
    const post = await prisma.post.findFirst({
      where: { id: postId },
      include: { collections: true },
    });
    if (post) {
      const collections = post.collections
        .filter((collection: any) => collection.name)
        .map((collection: any) => collection.name);
      try {
        await clientTypesense
          .collections(POST_COLLECTION)
          .documents(postId)
          .update({
            collections,
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
  return collection;
};

export const removePostToFromCollectionId = async (
  id: string,
  postId: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const collection = await prisma.collection.update({
    where: {
      id,
    },
    data: {
      posts: { disconnect: [{ id: postId }] },
    },
  });

  if (collection) {
    const POST_COLLECTION = `${collection.siteId}`;
    const post = await prisma.post.findFirst({
      where: { id: postId },
      include: { collections: true },
    });
    if (post) {
      const collections = post.collections
        .filter((collection: any) => collection.name)
        .map((collection: any) => collection.name);
      try {
        await clientTypesense
          .collections(POST_COLLECTION)
          .documents(postId)
          .update({
            collections,
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return collection;
};

export const createCollection = withSiteAuth(
  async (formData: FormData, site: Site) => {
    const link = formData && (formData.get("link") as string);
    const type =
      (formData && (formData.get("type") as type_collection)) || "default";

    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    console.log(formData);

    const response = await prisma.collection.create({
      data: {
        siteId: site.id,
        userId: session.user.id,
        type,
        ...(link ? { links: { connect: [{ id: link }] } } : {}),
      },
    });

    await revalidateTag(
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-collections`,
    );
    site.customDomain &&
      (await revalidateTag(`${site.customDomain}-collections`));

    return response;
  },
);

// creating a separate function for this because we're not using FormData
export const updateCollection = async (data: Collection) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const collection = await prisma.collection.findUnique({
    where: {
      id: data.id,
    },
    include: {
      site: true,
    },
  });
  if (!collection || collection.userId !== session.user.id) {
    return {
      error: "Collection not found",
    };
  }
  try {
    const response = await prisma.collection.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
        footerDescription: data.footerDescription,
      },
    });

    await revalidateTag(
      `${collection.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-collections`,
    );
    await revalidateTag(
      `${collection.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${collection.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    collection.site?.customDomain &&
      (await revalidateTag(`${collection.site?.customDomain}-collections`),
      await revalidateTag(
        `${collection.site?.customDomain}-${collection.slug}`,
      ));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateCollectionMetadata = async (
  formData: FormData,
  collection: string &
    Collection & {
      site: Site;
    },
  key: string,
) => {
  const value = formData.get(key) as string;
  try {
    let response;
    if (key === "image") {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return {
          error:
            "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
        };
      }

      const file = formData.get(key) as File;
      const filename = `${nanoid()}.${file.type.split("/")[1]}`;

      const { url } = await put(filename, file, {
        access: "public",
      });

      const blurhash = await getBlurDataURL(url);

      response = await prisma.collection.update({
        where: {
          id: collection,
        },
        data: {
          image: url,
          imageBlurhash: blurhash,
        },
      });
    } else {
      console.log(key, value);
      response = await prisma.collection.update({
        where: {
          id: collection,
        },
        data: {
          [key]: key === "published" ? value === "true" : value,
        },
      });
    }

    await revalidateTag(
      `${collection.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-collections`,
    );
    await revalidateTag(
      `${collection.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${collection.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    collection.site?.customDomain &&
      (await revalidateTag(`${collection.site?.customDomain}-collections`),
      await revalidateTag(
        `${collection.site?.customDomain}-${collection.slug}`,
      ));

    return response;
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2002") {
      return {
        error: `This slug is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const deleteCollection = withCollectionAuth(
  async (_: FormData, collection: Collection) => {
    try {
      const response = await prisma.collection.delete({
        where: {
          id: collection.id,
        },
        select: {
          siteId: true,
        },
      });
      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
);

export const getCollectionsFromSiteId = async (siteId: string) => {
  const collections = await prisma.collection.findMany({
    where: {
      ...(siteId ? { siteId: siteId } : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      site: true,
    },
  });
  return collections;
};
