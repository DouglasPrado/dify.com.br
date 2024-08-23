"use server";

import prisma from "@/lib/prisma";
import { Lead } from "@prisma/client";

export const createLead = async (
  data: Lead & {
    utm_campaign: string;
    utm_source: string;
    utm_medium: string;
    ref: string;
  },
) => {
  const whitelist = await prisma.whitelist.findFirst({
    where: {
      ref: data.ref,
      utm_campaign: data.utm_campaign,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
    },
  });
  const response =
    whitelist &&
    (await prisma.lead.create({
      data: {
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
        whitelist: {
          connect: { id: whitelist.id },
        },
      },
    }));
  return response;
};
