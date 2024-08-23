"use server";
import prisma from "@/lib/prisma";
import { Link, Site } from "@prisma/client";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { revalidateTag } from "next/cache";
import qrcode from "qrcode";
import { getSession, withSiteAuth } from "../auth";
import { getBlurDataURL } from "../utils";

export const getSiteFromLinkId = async (linkId: string) => {
  const link = await prisma.link.findUnique({
    where: {
      id: linkId,
    },
    select: {
      siteId: true,
    },
  });
  return link?.siteId;
};

export const createLink = withSiteAuth(async (_: FormData, site: Site) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const link = await prisma.link.create({
    data: {
      siteId: site.id,
      status: "active",
    },
  });

  let url = site.customDomain
    ? `${site.customDomain}/link/${link.url}`
    : `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/link/${link.url}`;

  qrcode.toDataURL(url, async function (err, url) {
    await prisma.link.update({
      where: {
        id: link.id,
      },
      data: {
        qrCode: url,
      },
    });
  });

  await revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-links`,
  );
  site.customDomain && (await revalidateTag(`${site.customDomain}-links`));

  return link;
});

export const updateLinkMetadata = async (
  formData: FormData,
  link: string &
    Link & {
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

      response = await prisma.link.update({
        where: {
          id: link,
        },
        data: {
          image: url,
          imageBlurhash: blurhash,
        },
      });
    } else {
      response = await prisma.link.update({
        where: {
          id: link,
        },
        data: {
          [key]: key === "published" ? value === "true" : value,
        },
      });
    }

    await revalidateTag(
      `${link.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-links`,
    );
    await revalidateTag(
      `${link.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${link.url}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    link.site?.customDomain &&
      (await revalidateTag(`${link.site?.customDomain}-links`),
      await revalidateTag(`${link.site?.customDomain}-${link.url}`));

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
};

export const updateLink = withSiteAuth(
  async (formData: FormData, site: Site, key: string) => {
    const value = formData.get(key) as string;
  },
);

export const deleteSite = withSiteAuth(async (_: FormData, site: Site) => {});
