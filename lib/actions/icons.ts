"use server";

import prisma from "@/lib/prisma";

export const getIcons = async (
  filter?: string,
  page: number = 1,
  pageSize: number = 10,
) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  return await prisma.icon.findMany({
    where: { label: { startsWith: filter } },
    select: {
      value: true,
      label: true,
    },
    skip,
    take,
    orderBy: {
      order: "asc",
    },
  });
};
