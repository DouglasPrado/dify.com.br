"use server";

import { getSession, withCategoryAuth, withSiteAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Category, Site } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const getSiteFromCategoryId = async (categoryId: string) => {
  const collection = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      siteId: true,
    },
  });
  return collection?.siteId;
};

export const addCategoryToFromCollectionId = async (
  id: string,
  categoryId: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const collection = await prisma.collection.update({
    where: {
      id,
    },
    data: {
      categories: { connect: [{ id: categoryId }] },
    },
  });
  return collection;
};

export const removeCategoryToFromCollectionId = async (
  id: string,
  categoryId: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const collection = await prisma.collection.update({
    where: {
      id,
    },
    data: {
      categories: { disconnect: [{ id: categoryId }] },
    },
  });

  return collection;
};

export const createCategory = withSiteAuth(async (_: FormData, site: Site) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const response = await prisma.category.create({
    data: {
      siteId: site.id,
    },
  });

  await revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-categories`,
  );
  site.customDomain && (await revalidateTag(`${site.customDomain}-categories`));

  return response;
});

// creating a separate function for this because we're not using FormData
export const updateCategory = async (data: Category) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const category = await prisma.category.findUnique({
    where: {
      id: data.id,
    },
    include: {
      site: true,
    },
  });
  if (!category) {
    return {
      error: "Collection not found",
    };
  }
  try {
    const response = await prisma.category.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
      },
    });

    await revalidateTag(
      `${category.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-collections`,
    );
    await revalidateTag(
      `${category.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${category.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    category.site?.customDomain &&
      (await revalidateTag(`${category.site?.customDomain}-collections`),
      await revalidateTag(`${category.site?.customDomain}-${category.slug}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateCategoryMetadata = async (
  formData: FormData,
  category: string &
    Category & {
      site: Site;
    },
  key: string,
) => {
  const value = formData.get(key) as string;
  try {
    const response = await prisma.category.update({
      where: {
        id: category,
      },
      data: {
        [key]: value,
      },
    });

    await revalidateTag(
      `${category.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-collections`,
    );
    await revalidateTag(
      `${category.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${category.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    category.site?.customDomain &&
      (await revalidateTag(`${category.site?.customDomain}-collections`),
      await revalidateTag(`${category.site?.customDomain}-${category.slug}`));

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

export const deleteCategory = withCategoryAuth(
  async (_: FormData, category: Category) => {
    try {
      const response = await prisma.collection.delete({
        where: {
          id: category.id,
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

export const getCollectionsFromSiteId = async (siteId: string) => {
  const collections = await prisma.collection.findMany({
    where: {
      ...(siteId ? { siteId: siteId } : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      site: true,
    },
  });
  return collections;
};
