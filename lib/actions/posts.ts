"use server";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getBlurDataURL, nanoid } from "@/lib/utils";
import { Post, Site } from "@prisma/client";
import { put } from "@vercel/blob";
import { revalidateTag } from "next/cache";
import { Client } from "typesense";
import { withPostAuth, withSiteAuth } from "../auth";

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
  ],
};

export const getSiteFromPostId = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      siteId: true,
    },
  });
  return post?.siteId;
};

export const createPost = withSiteAuth(async (_: FormData, site: Site) => {
  const POST_COLLECTION = `${site.id}`;
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const post = await prisma.post.create({
    data: {
      siteId: site.id,
      userId: session.user.id,
    },
  });

  await revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
  );
  site.customDomain && (await revalidateTag(`${site.customDomain}-posts`));

  try {
    await clientTypesense.collections(POST_COLLECTION).retrieve();
  } catch (error) {
    await clientTypesense
      .collections()
      .create({ ...postsSchema, name: POST_COLLECTION });
  }
  await clientTypesense
    .collections(POST_COLLECTION)
    .documents()
    .upsert({ ...post, type: "post" });
  return post;
});

// creating a separate function for this because we're not using FormData
export const updatePost = async (data: Post) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const post = await prisma.post.findUnique({
    where: {
      id: data.id,
    },
    include: {
      site: true,
    },
  });
  if (!post || post.userId !== session.user.id) {
    return {
      error: "Post not found",
    };
  }
  try {
    const post = await prisma.post.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
      },
      include: { site: true },
    });

    const POST_COLLECTION = `${post.siteId}`;

    await clientTypesense
      .collections(POST_COLLECTION)
      .documents(post.id)
      .update({
        title: post.title,
        description: post.description,
        image: post.image,
        imageBlurhash: post.imageBlurhash,
        slug: post.slug,
        type: "post",
      });

    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
    );
    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    post.site?.customDomain &&
      (await revalidateTag(`${post.site?.customDomain}-posts`),
      await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

    return post;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updatePostMetadata = withPostAuth(
  async (
    formData: FormData,
    post: Post & {
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

        response = await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            image: url,
            imageBlurhash: blurhash,
          },
        });
        await prisma.media.create({
          data: {
            slug: url,
            type: "jpg",
            siteId: post.siteId,
            metadata: {
              postId: post.id,
              type: "highlight",
            },
          },
        });
      } else {
        response = await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            [key]: key === "published" ? value === "true" : value,
          },
        });
      }

      const POST_COLLECTION = `${post.siteId}`;

      await clientTypesense
        .collections(POST_COLLECTION)
        .documents(post.id)
        .update({
          title: post.title,
          description: post.description,
          image: post.image,
          imageBlurhash: post.imageBlurhash,
          slug: post.slug,
        });

      await revalidateTag(
        `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
      );
      await revalidateTag(
        `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
      );

      // if the site has a custom domain, we need to revalidate those tags too
      post.site?.customDomain &&
        (await revalidateTag(`${post.site?.customDomain}-posts`),
        await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

      return response;
    } catch (error: any) {
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
  },
);

export const deletePost = withPostAuth(async (_: FormData, post: Post) => {
  try {
    const POST_COLLECTION = `${post.siteId}`;

    await clientTypesense
      .collections(POST_COLLECTION)
      .documents(post.id)
      .delete();

    const response = await prisma.post.delete({
      where: {
        id: post.id,
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
});
