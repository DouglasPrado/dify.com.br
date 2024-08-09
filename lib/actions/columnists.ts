"use server";

import prisma from "@/lib/prisma";
import { Columnist, Site } from "@prisma/client";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { revalidateTag } from "next/cache";
import { Client } from "typesense";
import { getSession, withColumnistAuth, withSiteAuth } from "../auth";
import { getBlurDataURL } from "../utils";

const clientTypesense = new Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST as string,
      port: Number(process.env.TYPESENSE_PORT) as number,
      protocol: process.env.TYPESENSE_PROTOCOL as string,
    },
  ],
  apiKey: process.env.TYPESENSE_ADMIN_API_KEY as string,
});

const schema: any = {
  enable_nested_fields: true,
  fields: [
    { name: "id", type: "string" },
    { name: "title", type: "string", optional: true },
    { name: "description", type: "string", optional: true },
    { name: "type", type: "string", optional: true },
    { name: "image", type: "string", optional: true },
    { name: "imageBlurhash", type: "string", optional: true },
    { name: "tags", type: "string[]", optional: true, facet: true },
    { name: "collections", type: "string[]", optional: true, facet: true },
  ],
};

export const getSiteFromColumnistId = async (columnistId: string) => {
  const columnist = await prisma.columnist.findUnique({
    where: {
      id: columnistId,
    },
    select: {
      siteId: true,
    },
  });
  return columnist?.siteId;
};

export const createColumnist = withSiteAuth(async (_: FormData, site: Site) => {
  const COLUMNIST_COLLECTION = `${site.id}`;
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const columnist = await prisma.columnist.create({
    data: {
      siteId: site.id,
    },
  });

  await revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-columnists`,
  );
  site.customDomain && (await revalidateTag(`${site.customDomain}-columnists`));

  try {
    await clientTypesense.collections(COLUMNIST_COLLECTION).retrieve();
  } catch (error) {
    await clientTypesense
      .collections()
      .create({ ...schema, name: COLUMNIST_COLLECTION });
  }
  await clientTypesense
    .collections(COLUMNIST_COLLECTION)
    .documents()
    .upsert({ ...columnist, type: "columnist" });

  return columnist;
});

export const updateColumnistMetadata = withColumnistAuth(
  async (
    formData: FormData,
    columnist: Columnist & {
      site: Site;
    },
    key: string,
  ) => {
    const value = formData.get(key) as string;

    try {
      let response;
      if (key === "image") {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          return {
            error:
              "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
          };
        }

        const file = formData.get(key) as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = await getBlurDataURL(url);

        response = await prisma.columnist.update({
          where: {
            id: columnist.id,
          },
          data: {
            image: url,
            imageBlurhash: blurhash,
          },
        });
      } else {
        response = await prisma.columnist.update({
          where: {
            id: columnist.id,
          },
          data: {
            [key]: value,
          },
        });
      }

      const COLUMNIST_COLLECTION = `${columnist.siteId}`;

      await clientTypesense
        .collections(COLUMNIST_COLLECTION)
        .documents(columnist.id)
        .update({
          title: columnist.name,
          description: columnist.description,
          image: columnist.image,
          imageBlurhash: columnist.imageBlurhash,
          slug: columnist.slug,
        });

      await revalidateTag(
        `${columnist.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-columnists`,
      );
      await revalidateTag(
        `${columnist.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${columnist.slug}`,
      );

      // if the site has a custom domain, we need to revalidate those tags too
      columnist.site?.customDomain &&
        (await revalidateTag(`${columnist.site?.customDomain}-columnists`),
        await revalidateTag(
          `${columnist.site?.customDomain}-${columnist.slug}`,
        ));

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This slug is already in use`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);

export const deleteColumnist = withSiteAuth(
  async (_: FormData, columnist: Columnist) => {
    try {
      const COLUMNIST_COLLECTION = `${columnist.siteId}`;

      await clientTypesense
        .collections(COLUMNIST_COLLECTION)
        .documents(columnist.id)
        .delete();

      const response = await prisma.columnist.delete({
        where: {
          id: columnist.id,
        },
        select: {
          siteId: true,
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
