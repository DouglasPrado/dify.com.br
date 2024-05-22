import prisma from "@/lib/prisma";
import { client } from "@/trigger";
import { OpenAI } from "@trigger.dev/openai";
import { eventTrigger } from "@trigger.dev/sdk";
import { addDays } from "date-fns";
import { z } from "zod";

const openai = new OpenAI({
  id: "openai-new",
  apiKey: process.env.OPENAI_API_KEY!,
});
// use Open AI to summarize text from the form
client.defineJob({
  id: "post-start",
  name: "Post – Start",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "post.start",
    schema: z.object({
      description: z.string(),
      refId: z.string(),
      siteId: z.string(),
      launchId: z.string().nullable(),
    }),
  }),
  run: async (payload, io) => {
    const result = io.try(
      async () => {
        
      },
      async (error) => {
      },
    );
    return result;
  },
});
