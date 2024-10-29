"use server";

import prisma from "@/lib/prisma";
import { Knowledge, Site } from "@prisma/client";
import { getSession, withKnowledgeAuth, withSiteAuth } from "../auth";

export const getSiteFromKnowledge = async (knowledgeId: string) => {
  const knowledgeItem = await prisma.knowledge.findUnique({
    where: {
      id: knowledgeId,
    },
    select: { siteId: true },
  });
  return knowledgeItem?.siteId;
};

export const createKnowledge = withSiteAuth(
  async (formData: FormData, site: Site) => {
    const title = formData.get("title") as string;
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }

    const response = await prisma.knowledge.create({
      data: {
        siteId: site.id,
        title,
        interface: "site",
        root: true,
      },
    });
    return response;
  },
);

export const deleteKnowledge = withKnowledgeAuth(
  async (_: FormData, knowledge: Knowledge) => {
    try {
      const response = await prisma.knowledge.delete({
        where: {
          id: knowledge.id,
        },
      });

      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
);
