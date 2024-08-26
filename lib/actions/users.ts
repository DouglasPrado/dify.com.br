"use server";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { generateTokenSimple } from "../utils";

export const editUser = async (
  formData: FormData,
  _id: unknown,
  key: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const value = formData.get(key) as string;

  try {
    const response = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        [key]: value,
      },
    });
    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This ${key} is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const generateTokenChromeExtension = async () => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const token = generateTokenSimple();

  const chromeExtension = await prisma.chromeExtension.upsert({
    where: {
      userId: session.user.id,
    },
    update: {
      token,
    },
    create: {
      token,
      userId: session.user.id,
    },
  });
  return chromeExtension;
};

export const validateTokenChromeExtension = async (token: string) => {
  const chromeExtension = await prisma.chromeExtension.findFirst({
    where: {
      token,
    },
  });
  return !!chromeExtension || false;
};

export const sitesChromeExtension = async (token: string) => {
  const chromeExtension = await prisma.chromeExtension.findFirst({
    select: {
      token: true,
      userId: true,
      user: {
        select: {
          id: true,
          sites: {
            select: { id: true, name: true, favicon: true, userId: true },
          },
        },
      },
    },
    where: {
      token,
    },
  });
  return chromeExtension;
};
