"use server";

import prisma from "@/lib/prisma";
import { Site, type_reference } from "@prisma/client";
import { getSession, withSiteAuth } from "../auth";

export const getSiteFromReferenceId = async (referenceId: string) => {
  const reference = await prisma.reference.findUnique({
    where: {
      id: referenceId,
    },
    select: {
      siteId: true,
    },
  });
  return reference?.siteId;
};

export const createReference = withSiteAuth(
  async (formData: FormData, site: Site) => {
    const postId = formData.get("postId") as string;
    const content = formData.get("content") as string;
    const reference = formData.get("reference") as string;
    const type = formData.get("type") as type_reference;
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }

    const response = await prisma.reference.create({
      data: {
        siteId: site.id,
        type,
        content,
        reference,
        postId,
      },
    });
    return response;
  },
);
