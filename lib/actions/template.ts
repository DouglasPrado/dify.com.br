"use server";

import { getSession, withSiteAuth, withTemplateAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Site, Template, type_feature_item } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const getSiteFromTemplateId = async (id: string) => {
  const template = await prisma.template.findUnique({
    where: {
      id,
    },
    select: {
      siteId: true,
    },
  });
  return template?.siteId;
};

export const createTemplate = withSiteAuth(async (_: FormData, site: Site) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const response = await prisma.template.create({
    data: {
      site: { connect: { id: site.id } },
      feature: {
        create: {},
      },
      review: {
        create: {},
      },
    },
  });

  await revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-templates`,
  );
  site.customDomain && (await revalidateTag(`${site.customDomain}-templates`));

  return response;
});

// creating a separate function for this because we're not using FormData
export const updateTemplate = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const template = await prisma.template.findUnique({
    where: {
      id: id,
    },
    include: {
      site: true,
    },
  });
  if (!template) {
    return {
      error: "Template not found",
    };
  }
  try {
    const response = await prisma.template.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    await revalidateTag(
      `${template.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-templates`,
    );
    await revalidateTag(
      `${template.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${template.name}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    template.site?.customDomain &&
      (await revalidateTag(`${template.site?.customDomain}-templates`),
      await revalidateTag(`${template.site?.customDomain}-${template.name}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateTemplateMetadata = async (
  formData: FormData,
  template: string &
    Template & {
      site: Site;
    },
  key: string,
) => {
  const value = formData.get(key) as string;
  try {
    const response = await prisma.template.update({
      where: {
        id: template,
      },
      data: {
        [key]: value,
      },
    });

    await revalidateTag(
      `${template.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-templates`,
    );
    await revalidateTag(
      `${template.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${template.name}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    template.site?.customDomain &&
      (await revalidateTag(`${template.site?.customDomain}-templates`),
      await revalidateTag(`${template.site?.customDomain}-${template.name}`));

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

export const deleteTemplate = withTemplateAuth(
  async (_: FormData, template: Template) => {
    try {
      const response = await prisma.template.delete({
        where: {
          id: template.id,
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

export const addItemReview = async ({
  templateId,
  name,
}: {
  templateId: string;
  name: string;
}) => {
  try {
    const template = await prisma.template.findUnique({
      where: { id: templateId },
      select: { reviewId: true },
    });
    if (template && template.reviewId) {
      const response = await prisma.reviewItem.create({
        data: {
          name,
          reviewId: template.reviewId,
        },
      });
      return response;
    }
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const removeItemReview = async (id: string) => {
  try {
    const response = await prisma.reviewItem.delete({
      where: {
        id,
      },
    });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const addItemFeature = async ({
  templateId,
  name,
  type,
}: {
  templateId: string;
  name: string;
  type: type_feature_item;
}) => {
  try {
    const template = await prisma.template.findUnique({
      where: { id: templateId },
      select: { featureId: true },
    });
    if (template && template.featureId) {
      const response = await prisma.featureItem.create({
        data: {
          name,
          type,
          featureId: template.featureId,
        },
      });
      return response;
    }
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const removeItemFeature = async (id: string) => {
  try {
    const response = await prisma.featureItem.delete({
      where: {
        id,
      },
    });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
