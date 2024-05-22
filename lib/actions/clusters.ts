"use server";

import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";
import { getSession, withProductAuth } from "../auth";

export const getSiteFromClusterId = async (clusterId: string) => {
  const collection = await prisma.whitelist.findUnique({
    where: {
      id: clusterId,
    },
    select: {
      siteId: true,
    },
  });
  return collection?.siteId;
};

export const createWhitelist = withProductAuth(
  async (data: FormData, product: Product, key: string) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }

    const response = await prisma.whitelist.create({
      data: {
        name: `${product.title} - ${data.get("utm_campaign")}`!,
        ref: product.id,
        siteId: product.siteId!,
        utm_campaign: `${data.get("utm_campaign")}`,
        utm_source: `${data.get("utm_source")}`,
        utm_medium: `${data.get("utm_medium")}`,
      },
    });
    return response;
  },
);
