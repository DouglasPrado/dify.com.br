"use server";

import prisma from "@/lib/prisma";
import { status_queue, type_queue } from "@prisma/client";
import { getSession } from "../auth";

export const getSiteFromQueueId = async (queueId: string) => {
  const queue = await prisma.queue.findUnique({
    where: {
      id: queueId,
    },
    select: {
      siteId: true,
    },
  });
  return queue?.siteId;
};

export const createQueue = async (formData: FormData, siteId: string) => {
  const data = formData.get("data") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as type_queue;
  const status = formData.get("status") as status_queue;
  const scheduleAt = new Date(formData.get("scheduleAt") as string);

  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const response = await prisma.queue.create({
    data: {
      description,
      data,
      type,
      status,
      scheduleAt,
      siteId,
    },
  });
  return response;
};
