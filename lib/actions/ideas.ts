"use server";

import prisma from "@/lib/prisma";

export const getIdeas = async (
  siteId: string,
  page: number = 1,
  pageSize: number = 10,
) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  return await prisma.idea.findMany({
    where: { siteId },
    skip,
    take,
    orderBy: {
      order: "desc",
    },
  });
};

export const reloadIdeas = async (siteId: string) => {
  const trigger = await prisma.trigger.findFirst({
    where: {
      name: "Ideas.Generate",
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
            siteId,
          }),
        },
      );
    } catch (error) {
      console.log(error);
    }
  }
};

export const deleteIdeas = async (siteId: string) => {
  return await prisma.idea.deleteMany({
    where: {
      siteId,
    },
  });
};

export const deleteIdea = async (id: string) => {
  try {
    return await prisma.idea.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
