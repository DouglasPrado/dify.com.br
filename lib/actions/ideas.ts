"use server";

import prisma from "@/lib/prisma";

export const getIdeas = async (
  siteId: string,
  page: number = 1,
  pageSize: number = 10,
) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  return await prisma.ideas.findMany({
    where: { siteId },
    skip,
    take,
    orderBy: {
      order: "desc",
    },
  });
};

export const reloadIdeas = async () => {
  return true;
};
