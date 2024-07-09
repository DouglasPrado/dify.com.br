"use server";

import { client } from "@/trigger";

export const generateMagic = async (formData: FormData, postId: string) => {
  const response = await client.sendEvent({
    name: "post-title.create",
    payload: {
      postId,
    },
  });
  return response;
};
