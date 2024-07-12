"use server";

import prisma from "@/lib/prisma";
import { getSession } from "../auth";

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
