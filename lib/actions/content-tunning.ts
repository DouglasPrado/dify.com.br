"use server";

import prisma from "@/lib/prisma";
import { ContentFineTunning, Prisma, Site } from "@prisma/client";
import { getSession, withSiteAuth } from "../auth";

export const getSiteFromTunningId = async (referenceId: string) => {
  const reference = await prisma.knowledgeItem.findUnique({
    where: {
      id: referenceId,
    },
    select: {
      siteId: true,
    },
  });
  return reference?.siteId;
};

export const createContentTunning = withSiteAuth(
  async (_: FormData, site: Site) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }

    return await prisma.contentFineTunning.create({
      data: {
        siteId: site.id,
      },
    });
  },
);

// creating a separate function for this because we're not using FormData
export const updateContentTunning = async (
  id: string,
  data: Prisma.ContentFineTunningUncheckedUpdateInput,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const contentFineTunning = await prisma.contentFineTunning.findUnique({
    where: {
      id,
    },
  });

  if (!contentFineTunning) {
    return {
      error: "contetnFineTunning not found",
    };
  }

  try {
    const contentFineTunning = await prisma.contentFineTunning.update({
      where: {
        id,
      },
      data: {
        interface: data.interface,
        prompt: data.prompt,
        ...(data.heightImage ? { heightImage: data.heightImage } : {}),
        ...(data.widthImage ? { widthImage: data.widthImage } : {}),
        ...(data.limitWords ? { limitWords: data.limitWords } : {}),
      },
    });
    return contentFineTunning;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateContentTunningMetadata = async (
  formData: FormData,
  contentFineTunning: ContentFineTunning,
  key: string,
) => {
  const value = formData.get(key) as string;

  try {
    return await prisma.contentFineTunning.update({
      where: {
        id: contentFineTunning.id,
      },
      data: {
        [key]: key === "published" ? value === "true" : value,
      },
    });
  } catch (error: any) {
    console.log(error);
    return {
      error: error.message,
    };
  }
};

export const deleteContentTunning = withSiteAuth(
  async (_: FormData, contentFineTunning: ContentFineTunning) => {
    try {
      const response = await prisma.contentFineTunning.delete({
        where: {
          id: contentFineTunning.id,
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
