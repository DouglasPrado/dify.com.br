"use server";

import prisma from "@/lib/prisma";

export const getIcons = async (page: number = 1, pageSize: number = 10) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const icons = await prisma.icon.findMany({
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
  return icons;
};
