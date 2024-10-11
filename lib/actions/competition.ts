"use server";

import prisma from "@/lib/prisma";
import { type_competition } from "@prisma/client";

export const getCompetitions = async (
  siteId: string,
  page: number = 1,
  pageSize: number = 10,
  type: type_competition | null,
) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  return await prisma.competition.findMany({
    where: { siteId, ...(type ? { type } : {}) },
    skip,
    take,
    orderBy: {
      order: "desc",
    },
  });
};

export const createCompetition = async (
  siteId: string,
  url: string,
  type: type_competition,
) => {
  return await prisma.competition.create({
    data: {
      url,
      type,
      siteId,
    },
  });
};

export const deleteCompetition = async (id: string) => {
  return await prisma.competition.delete({
    where: {
      id,
    },
  });
};
