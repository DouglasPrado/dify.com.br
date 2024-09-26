"use server";
import prisma from "@/lib/prisma";
export const updateProductFeatures = async (data: any) => {
  Object.entries(data).map(async (item: any) => {
    await prisma.productFeature.update({
      where: { id: item[0] },
      data: { value: item[1] },
    });
  });
  return true;
};
