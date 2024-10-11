"use server";

import prisma from "@/lib/prisma";
import { type_competition } from "@prisma/client";

export const getKeywords = async (
  siteId: string,
  page: number = 1,
  pageSize: number = 10,
  type: type_competition | null,
) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  return await prisma.keyword.findMany({
    where: { siteId, ...(type ? { type } : {}) },
    skip,
    take,
    orderBy: {
      order: "desc",
    },
  });
};

export const createKeyword = async (siteId: string, keywords: string) => {
  // Dividir o texto em palavras, removendo espaços extras
  const keywordsArray = keywords
    .split("\n")
    .map((word) => word.trim())
    .filter((word) => word);

  // Remover duplicatas convertendo o Set para um array
  const uniqueKeywords = Array.from(new Set(keywordsArray));

  // Adicionar cada palavra individualmente
  for (const keyword of uniqueKeywords) {
    await prisma.keyword.upsert({
      where: { siteId_keyword: { siteId, keyword } }, // Unique constraint, ajuste o campo conforme necessário
      update: {},
      create: {
        keyword, // Atribuir o valor da palavra ao campo keyword
        siteId,
      },
    });
  }
};

export const deleteKeyword = async (id: string) => {
  return await prisma.keyword.delete({
    where: {
      id,
    },
  });
};
