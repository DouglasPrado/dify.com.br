"use server";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { client } from "@/trigger";
import { Launch, Site } from "@prisma/client";
import { addDays, formatISO, intervalToDuration } from "date-fns";
import { revalidateTag } from "next/cache";
import { withLaunchAuth, withSiteAuth } from "../auth";
import { prepareURL } from "../utils";

export const getSiteFromLaunchId = async (launchId: string) => {
  const launch = await prisma.launch.findUnique({
    where: {
      id: launchId,
    },
    select: {
      siteId: true,
    },
  });
  return launch?.siteId;
};

export const createLaunch = withSiteAuth(async (_: FormData, site: Site) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const launch = await prisma.launch.create({
    data: {
      siteId: site.id,
    },
  });

  await revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-launchs`,
  );
  site.customDomain && (await revalidateTag(`${site.customDomain}-launchs`));

  return launch;
});

// creating a separate function for this because we're not using FormData
export const updateLaunch = async (data: any) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const launch = await prisma.launch.findUnique({
    where: {
      id: data.id,
    },
    include: {
      site: true,
    },
  });
  if (!launch) {
    return {
      error: "launch not found",
    };
  }
  try {
    const quantity = String(
      data?.keywords &&
        data?.keywords?.split("\n").map((item: any) => item !== "" && item)
          .length + 1,
    );

    const launch = await prisma.launch.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.keywordMain,
        keywordMain: data.keywordMain,
        keywords: data.keywords,
        quantity,
        description: data.description,
      },
      include: { site: true },
    });
    //Criar categoria
    let collection = await prisma.collection.findFirst({
      where: { slug: prepareURL(data.keywordMain) },
    });
    if (!collection) {
      collection = await prisma.collection.create({
        data: {
          name: data.keywordMain,
          slug: prepareURL(data.keywordMain),
          siteId: launch.siteId,
        },
      });
    }

    console.log(data);
    //Criar post
    await Promise.all([
      data.keywords?.split("\n").map(async (keyword: string) => {
        console.log(keyword, "keyword");
        if (keyword !== "") {
          const post = await prisma.post.create({
            data: {
              title: keyword,
              slug: prepareURL(keyword),
              keywords: keyword,
              siteId: launch.siteId,
              launchId: launch.id,
              userId: session?.user.id,
              collections: { connect: { id: collection.id } },
            },
          });
          console.log(post, "post");
          const trigger = await prisma.trigger.findFirst({
            where: {
              name: "Post.Simple",
            },
          });

          if (trigger) {
            const isProduction = process.env.NODE_ENV === "production";
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
                  post,
                }),
              },
            );
          }
        }
      }),
    ]);

    await revalidateTag(
      `${launch.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-launchs`,
    );
    await revalidateTag(
      `${launch.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${launch.id}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    launch.site?.customDomain &&
      (await revalidateTag(`${launch.site?.customDomain}-launchs`),
      await revalidateTag(`${launch.site?.customDomain}-${launch.id}`));

    return launch;
  } catch (error: any) {
    console.log(error);
    return {
      error: error.message,
    };
  }
};

export const updateLaunchMetadata = withLaunchAuth(
  async (
    formData: FormData,
    launch: Launch & {
      site: Site;
    },
    key: string,
  ) => {
    let value = formData.get(key) as string;
    let data = {
      [key]: value,
    };
    if (key === "startAt") {
      const startAt = new Date(value);
      data[key] = formatISO(startAt);
    }

    if (key === "endAt") {
      const endAt = new Date(value);
      const diffDate = intervalToDuration({
        start: endAt,
        end: new Date(launch.endAt),
      });
      if (diffDate && diffDate.days! > 0) {
        data.period = `${+launch.period + +diffDate.days!}`;
      }
      data[key] = formatISO(endAt);
    }
    if (key === "status" && value === "play") {
      await client.sendEvent({
        name: "launch.start",
        payload: {
          launch_id: launch.id,
        },
      });
    }
    try {
      let response;
      if (key === "multi") {
        if (formData.get("startAt") && formData.get("period")) {
          const period = Number(formData.get("period"));
          const startAt = new Date(formData.get("startAt") as string);
          const endAt = addDays(startAt, period);
          formData.append("startAt", formatISO(startAt));
          formData.append("endAt", formatISO(endAt));
        }
        const dataValues = Object.fromEntries(formData);
        response = await prisma.launch.update({
          where: {
            id: launch.id,
          },
          data: dataValues,
        });
      } else {
        response = await prisma.launch.update({
          where: {
            id: launch.id,
          },
          data,
        });
      }

      await revalidateTag(
        `${launch.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-launchs`,
      );
      await revalidateTag(
        `${launch.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${launch.id}`,
      );

      // if the site has a custom domain, we need to revalidate those tags too
      launch.site?.customDomain &&
        (await revalidateTag(`${launch.site?.customDomain}-launchs`),
        await revalidateTag(`${launch.site?.customDomain}-${launch.id}`));

      return response;
    } catch (error: any) {
      console.log(error);
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

export const deleteLaunch = withLaunchAuth(
  async (_: FormData, launch: Launch) => {
    try {
      const response = await prisma.launch.delete({
        where: {
          id: launch.id,
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
