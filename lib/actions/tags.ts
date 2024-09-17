"use server";

import prisma from "@/lib/prisma";
import { Client } from "typesense";
import { getSession } from "../auth";

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

export const getSiteFromTagId = async (id: string) => {
  const tag = await prisma.tag.findUnique({
    where: {
      id,
    },
    select: {
      siteId: true,
    },
  });
  return tag?.siteId;
};

export const getTagsFromSiteId = async (siteId: string) => {
  const tags = await prisma.tag.findMany({
    where: {
      siteId,
    },
  });
  return tags;
};

export const createTag = async (data: {
  name: string;
  icon: string;
  color: string;
}) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const tag = await prisma.tag.create({
    data,
  });

  return tag;
};

export const updateTag = async (data: any, id: string) => {
  try {
    return await prisma.tag.update({
      where: {
        id,
      },
      data,
    });
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
};

export const deleteTag = async (id: string) => {
  try {
    return await prisma.tag.delete({
      where: {
        id,
      },
    });
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
};

export const addPostToFromTagId = async (id: string, postId: string) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const tag = await prisma.tag.update({
    where: {
      id,
    },
    data: {
      posts: { connect: [{ id: postId }] },
    },
  });
  if (tag) {
    const POST_TAG = `${tag.siteId}`;
    const post = await prisma.post.findFirst({
      where: { id: postId },
      include: { tags: true },
    });
    if (post) {
      const tags = post.tags.filter((tag: any) => tag.name).map((tag: any) => tag.name);
      await clientTypesense.collections(POST_TAG).documents(postId).update({
        tags,
      });
    }
  }
  return tag;
};

export const removePostToFromTagId = async (id: string, postId: string) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const tag = await prisma.tag.update({
    where: {
      id,
    },
    data: {
      posts: { disconnect: [{ id: postId }] },
    },
  });

  if (tag) {
    const POST_TAG = `${tag.siteId}`;
    const post = await prisma.post.findFirst({
      where: { id: postId },
      include: { tags: true },
    });
    if (post) {
      const tags = post.tags.filter((tag: any) => tag.name).map((tag: any) => tag.name);
      await clientTypesense.collections(POST_TAG).documents(postId).update({
        tags,
      });
    }
  }

  return tag;
};
