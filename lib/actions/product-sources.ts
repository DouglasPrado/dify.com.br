"use server";
import prisma from "@/lib/prisma";
export const updateProductSources = async (data: any) => {
  Object.entries(data.data).map(async (item: any) => {
    await prisma.productSources.upsert({
      where: {
        source_productId: {
          source: item[0],
          productId: data.productId,
        },
      },
      update: { source: item[0], url: item[1], productId: data.productId },
      create: { source: item[0], url: item[1], productId: data.productId },
    });
  });
  return true;
};
