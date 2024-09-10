"use server";
const sharp = require("sharp");
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getBlurDataURL, prepareURL } from "@/lib/utils";
import { ContentFineTunning, Post, Site } from "@prisma/client";
import { put } from "@vercel/blob";
import { revalidateTag } from "next/cache";
import { Client } from "typesense";
import { withPostAuth, withSiteAuth } from "../auth";
import { addURLIndexGoogle } from "../google";

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
    { name: "published", type: "bool", optional: true, facet: true },
    { name: "image", type: "string", optional: true },
    { name: "imageBlurhash", type: "string", optional: true },
    { name: "tags", type: "string[]", optional: true, facet: true },
    { name: "collections", type: "string[]", optional: true, facet: true },
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
  const contentFineTunning: ContentFineTunning | any =
    await prisma.contentFineTunning.findFirst({
      where: {
        siteId: site.id,
        interface: "blog",
      },
      select: { published: true, columnistId: true },
    });
  const post = await prisma.post.create({
    data: {
      siteId: site.id,
      userId: session.user.id,
      ...(contentFineTunning?.columnistId
        ? { columnistId: contentFineTunning?.columnistId }
        : {}),
      published: contentFineTunning?.published,
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
export const updatePost = async (data: any) => {
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
    const getPost = await prisma.post.findFirst({ where: { id: data.id } });

    const post = await prisma.post.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.title &&
          getPost!.title !== data.title && { title: data.title }),
        ...(data.description &&
          getPost!.description !== data.description && {
            description: data.description,
          }),
        ...(data.content &&
          getPost!.content !== data.content && { content: data.content }),
        ...(data.contentJSON &&
          getPost!.contentJSON !== data.contentJSON && {
            contentJSON:
              typeof data.contentJSON === "object"
                ? data.contentJSON
                : JSON.parse(data.contentJSON as string),
          }),
        ...(data.keywords &&
          getPost!.keywords !== data.keywords && { keywords: data.keywords }),

        ...(data.outlines &&
          getPost!.outlines !== data.outlines && { outlines: data.outlines }),
        ...(data.limitWords &&
          getPost!.limitWords !== data.limitWords && {
            limitWords: data.limitWords,
          }),
      },
      include: { site: true },
    });

    try {
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
    } catch (error) {
      console.log(error);
    }

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
    console.log(error, "error");
    return {
      error: error,
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

      if (key === "title") {
        await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            ...(post.slug === null ? { slug: prepareURL(value) } : {}),
          },
        });
      }
      if (key === "image") {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          return {
            error:
              "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
          };
        }

        const contentFineTunning: ContentFineTunning | any =
          await prisma.contentFineTunning.findFirst({
            where: {
              siteId: post.siteId,
              interface: "blog",
            },
            select: { heightImage: true, widthImage: true },
          });

        const file = formData.get(key) as File;
        const imageBuffer = await file.arrayBuffer();
        const image = sharp(Buffer.from(imageBuffer));
        const optimizedImageBuffer = await image
          .webp()
          .resize(
            Number(contentFineTunning.widthImage) || 1280,
            Number(contentFineTunning.heightImage) || 720,
          )
          .toBuffer();

        const filename = `${prepareURL(post.title)}.webp`;

        const { url } = await put(filename, optimizedImageBuffer, {
          contentType: "image/webp",
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
      } else if (key === "product") {
        await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            products: { connect: { id: value } },
          },
        });
      } else if (key === "remove_product") {
        await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            products: { disconnect: { id: value } },
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
      response = await prisma.post.findFirst({
        where: {
          id: post.id,
        },
      });
      try {
        await clientTypesense
          .collections(POST_COLLECTION)
          .documents(post.id)
          .update({
            title: response!.title,
            description: response!.description,
            image: response!.image,
            imageBlurhash: response!.imageBlurhash,
            slug: response!.slug,
            published: response!.published,
          });
      } catch (error) {
        console.log(error);
      }
      if (key === "published") {
        addURLIndexGoogle(
          `https://${
            post.site.customDomain
              ? post.site.customDomain
              : `${post.site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
          }/${post.slug}`,
        );
      }

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
  },
);

export const deletePost = withPostAuth(async (_: FormData, post: Post) => {
  try {
    const POST_COLLECTION = `${post.siteId}`;
    await clientTypesense
      .collections(POST_COLLECTION)
      .documents(post.id)
      .delete();
  } catch (error: any) {
    console.log(error.message);
  }
  const response = await prisma.post.delete({
    where: {
      id: post.id,
    },
    select: {
      siteId: true,
    },
  });
  return response;
});

export const addPostToFromRelationshipId = async (
  id: string,
  postId: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const relationship = await prisma.postRelation.create({
    data: {
      postId: id,
      relatedPostId: postId,
    },
  });

  return relationship;
};

export const removePostToFromRelationshipId = async (
  id: string,
  postId: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const relationship = await prisma.postRelation.delete({
    where: {
      postId_relatedPostId: {
        postId: id,
        relatedPostId: postId,
      },
    },
  });

  return relationship;
};

export const getPostsWithoutIdFromSiteId = async (
  id: string,
  siteId: string,
) => {
  const posts = await prisma.post.findMany({
    where: {
      NOT: { id: id },
      ...(siteId ? { siteId } : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      site: true,
    },
  });
  return posts;
};

export const getPostWithCollectionsAndRelatedPostsId = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: decodeURIComponent(id),
    },
    include: {
      collections: true,
      tags: true,
      relatedPosts: {
        include: {
          relatedPost: true,
        },
      },
      site: {
        select: {
          id: true,
          subdomain: true,
        },
      },
    },
  });
  return post;
};

export const getProductsFromPostId = async (id: string) => {
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
    include: { products: true },
  });
  return post!.products;
};

export const createPostAutomaticAI = withSiteAuth(
  async (formData: FormData, site: Site) => {
    const keyword = formData.get("keyword") as string;

    const POST_COLLECTION = `${site.id}`;
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const contentFineTunning: ContentFineTunning | any =
      await prisma.contentFineTunning.findFirst({
        where: {
          siteId: site.id,
          interface: "blog",
        },
        select: { published: true, columnistId: true },
      });
    const post = await prisma.post.create({
      data: {
        siteId: site.id,
        keywords: keyword,
        userId: session.user.id,
        ...(contentFineTunning?.columnistId
          ? { columnistId: contentFineTunning?.columnistId }
          : {}),
        published: contentFineTunning?.published,
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

    const trigger = await prisma.trigger.findFirst({
      where: {
        name: "Post.Create",
      },
    });
    if (trigger) {
      const isProduction = process.env.NODE_ENV === "production";
      try {
        await fetch(
          isProduction
            ? (trigger.productionHost as string)
            : (trigger.developHost as string),
          {
            method: trigger.method as string,
            headers: {
              Authorization: process.env.N8N as string,
            },
            body: JSON.stringify({
              post,
            }),
          },
        );
      } catch (error) {
        console.log(error);
      }
    }
    return post;
  },
);
