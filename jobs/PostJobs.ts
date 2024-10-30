import prisma from "@/lib/prisma";
import { client } from "@/trigger";
import { eventTrigger } from "@trigger.dev/sdk";
import { addDays } from "date-fns";
import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
const openai = new ChatOpenAI({
  openAIApiKey: String(process.env.OPENAI_API_KEY),
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
        const prompt = ChatPromptTemplate.fromMessages([
          ["system", "You are a world class technical documentation writer."],
          ["user", "{input}"],
        ]);
      },
      async (error) => {},
    );
    return result;
  },
});
