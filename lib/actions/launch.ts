"use server";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { client } from "@/trigger";
import { Launch, Site } from "@prisma/client";
import { addDays, formatISO, intervalToDuration } from "date-fns";
import { revalidateTag } from "next/cache";
import { withLaunchAuth, withSiteAuth } from "../auth";

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
export const updateLaunch = async (data: Launch) => {
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
  if (!launch || launch.userId !== session.user.id) {
    return {
      error: "launch not found",
    };
  }
  try {
    const launch = await prisma.launch.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
      },
      include: { site: true },
    });

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
