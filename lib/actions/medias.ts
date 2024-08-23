"use server";

import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { getBlurDataURL } from "../utils";

export const createMedia = async (
  formData: FormData,
  siteId: string,
  key: string,
) => {
  const file = formData.get(key) as File;
  const refId = formData.get("refId");
  if (file) {
    const filename = `${nanoid()}.${file.type.split("/")[1]}`;

    const { url } = await put(filename, file, {
      access: "public",
    });

    const blurhash = await getBlurDataURL(url);
    return await prisma.media.create({
      data: {
        slug: url,
        type: "jpg",
        siteId,
        metadata: {
          refId: `${refId}`,
          type: "general",
          blurhash,
        },
      },
    });
  }
};

export const getMediasFromSiteId = async (siteId: string) => {
  const medias = await prisma.media.findMany({
    where: {
      siteId,
    },
  });
  return medias;
};

export const deleteMedia = async (id: string) => {
  const response = await prisma.media.delete({
    where: {
      id,
    },
  });
  return response;
};
