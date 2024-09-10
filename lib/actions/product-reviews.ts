"use server";
import prisma from "@/lib/prisma";
export const updateProductReviews = async (id: string, data: any) => {
  Object.entries(data).map(async (item: any) => {
    await prisma.productReview.update({
      where: { id: item[0] },
      data: { value: item[1] },
    });
  });
  return true;
};
