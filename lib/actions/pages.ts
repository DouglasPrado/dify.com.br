"use server";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getBlurDataURL, nanoid } from "@/lib/utils";
import { Page, Site } from "@prisma/client";
import { put } from "@vercel/blob";
import { revalidateTag } from "next/cache";
import { Client } from "typesense";
import { withPageAuth, withSiteAuth } from "../auth";

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
    { name: "type", type: "string", optional: true, facet: true },
    { name: "image", type: "string", optional: true },
    { name: "imageBlurhash", type: "string", optional: true },
    { name: "tags", type: "string[]", optional: true, facet: true },
    { name: "collections", type: "string[]", optional: true, facet: true },
  ],
};

export const getSiteFromPageId = async (pageId: string) => {
  const page = await prisma.page.findUnique({
    where: {
      id: pageId,
    },
    select: {
      siteId: true,
    },
  });
  return page?.siteId;
};

export const createPage = withSiteAuth(async (_: FormData, site: Site) => {
  const PAGE_COLLECTION = `${site.id}`;
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const page = await prisma.page.create({
    data: {
      siteId: site.id,
      userId: session.user.id,
    },
  });

  await revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-pages`,
  );
  site.customDomain && (await revalidateTag(`${site.customDomain}-pages`));

  try {
    await clientTypesense.collections(PAGE_COLLECTION).retrieve();
  } catch (error) {
    await clientTypesense
      .collections()
      .create({ ...schema, name: PAGE_COLLECTION });
  }
  await clientTypesense
    .collections(PAGE_COLLECTION)
    .documents()
    .upsert({ ...page, type: "page" });

  return page;
});

// creating a separate function for this because we're not using FormData
export const updatePage = async (data: Page) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const page = await prisma.page.findUnique({
    where: {
      id: data.id,
    },
    include: {
      site: true,
    },
  });
  if (!page || page.userId !== session.user.id) {
    return {
      error: "Page not found",
    };
  }
  try {
    const page = await prisma.page.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
      },
      include: { site: true },
    });

    const PAGE_COLLECTION = `${page.siteId}`;

    await clientTypesense
      .collections(PAGE_COLLECTION)
      .documents(page.id)
      .update({
        title: page.title,
        description: page.description,
        image: page.image,
        imageBlurhash: page.imageBlurhash,
        slug: page.slug,
        type: "page",
      });

    await revalidateTag(
      `${page.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-pages`,
    );
    await revalidateTag(
      `${page.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-pages-${page.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    page.site?.customDomain &&
      (await revalidateTag(`${page.site?.customDomain}-pages`),
      await revalidateTag(`${page.site?.customDomain}-pages-${page.slug}`));

    return page;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updatePageMetadata = withPageAuth(
  async (
    formData: FormData,
    page: Page & {
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

        response = await prisma.page.update({
          where: {
            id: page.id,
          },
          data: {
            image: url,
            imageBlurhash: blurhash,
          },
        });
        await prisma.media.create({
          data: {
            slug: url,
            type: "jpg",
            siteId: page.siteId,
            metadata: {
              postId: page.id,
              type: "highlight",
            },
          },
        });
      } else {
        response = await prisma.page.update({
          where: {
            id: page.id,
          },
          data: {
            [key]: key === "published" ? value === "true" : value,
          },
        });
      }

      const PAGE_COLLECTION = `${response.siteId}`;

      await clientTypesense
        .collections(PAGE_COLLECTION)
        .documents(response.id)
        .update({
          title: response.title,
          description: response.description,
          image: response.image,
          imageBlurhash: response.imageBlurhash,
          slug: response.slug,
        });

      await revalidateTag(
        `${page.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-pages`,
      );
      await revalidateTag(
        `${page.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-pages-${page.slug}`,
      );

      // if the site has a custom domain, we need to revalidate those tags too
      page.site?.customDomain &&
        (await revalidateTag(`${page.site?.customDomain}-pages`),
        await revalidateTag(`${page.site?.customDomain}-pages-${page.slug}`));

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

export const deletePage = withPageAuth(async (_: FormData, page: Page) => {
  try {
    const PAGE_COLLECTION = `${page.siteId}`;

    await clientTypesense
      .collections(PAGE_COLLECTION)
      .documents(page.id)
      .delete();

    const response = await prisma.page.delete({
      where: {
        id: page.id,
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
});

export const createPageAI = async (
  type:
    | "Page.About"
    | "Page.Disclaimer"
    | "Page.TermUse"
    | "Page.PrivacyPolicy",
  siteId: string,
) => {
  const trigger = await prisma.trigger.findFirst({
    where: {
      name: type,
    },
  });
  if (trigger) {
    const isProduction = process.env.NODE_ENV === "production";
    try {
      await fetch(
        isProduction
          ? (trigger.productionHost as string)
          : (trigger.developHost as string),
        {
          method: trigger.method as string,
          headers: {
            Authorization: process.env.N8N as string,
          },
          body: JSON.stringify({
            siteId,
          }),
        },
      );
    } catch (error) {
      console.log(error);
    }
  }
};
