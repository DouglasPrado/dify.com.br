// Your first job

import prisma from "@/lib/prisma";
import { client } from "@/trigger";
import { OpenAI } from "@trigger.dev/openai";
import { eventTrigger } from "@trigger.dev/sdk";
import { z } from "zod";

const openai = new OpenAI({
  id: "openai-new",
  apiKey: process.env.OPENAI_API_KEY!,
});

client.defineJob({
  id: "keywords-job",
  name: "Create Keywords for Posts",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "post-keywords.create",
    schema: z.object({
      description: z.string(),
      refId: z.string(),
      siteId: z.string(),
      launchId: z.string().nullable(),
    }),
  }),
  integrations: {
    openai,
  },
  run: async (payload, io, ctx) => {
    await io.logger.info("🧪 Create Keywords for Posts");
    const queueKeywords = await prisma.queue.create({
      data: {
        type: "post_keywords",
        description: `${payload.description}`,
        status: "waiting",
        scheduleAt: new Date(),
        refId: payload.refId,
        siteId: payload.siteId as string,
        launchId: payload.launchId as string,
      },
    });
    const result = io.try(
      async () => {
        const completion = await io.openai.chat.completions.backgroundCreate(
          "Generating keywords",
          {
            messages: [
              {
                role: "system",
                content: `Vamos criar um texto informacional para o meu site de review,
              vou te munir com informações sobre o meu publico antes de começarmos,
              você entendeu?`,
              },
              {
                role: "system",
                content: `O objetivo é criar artigos informacionais é pra aumentar a minha autoridade do tópico com o Google, mostrar pra ele que sou expert no assunto e ter melhores rankings.`,
              },
              {
                role: "user",
                content: `Preciso que você as principais keywords de um artigo sobre "${payload.description}" para se posicionar na primeira página do Google.
            Retorne um json { keywords: ["keyword", "keyword"]}`,
              },
            ],
            model: "gpt-4-1106-preview",
            response_format: { type: "json_object" },
          },
        );
        const returnOpenAI: {
          keywords: string[];
        } = JSON.parse(completion.choices[0].message?.content!);

        const getKeywords: any = [];

        returnOpenAI.keywords.map((keyword) => {
          getKeywords.push(keyword);
        });

        await prisma.post.update({
          where: {
            id: payload.refId as string,
          },
          data: {
            keywords: JSON.stringify(getKeywords),
          },
        });

        await prisma.queue.update({
          where: {
            id: queueKeywords.id,
          },
          data: {
            status: "complete",
          },
        });

        await client.sendEvent({
          name: "post-outlines.create",
          payload: {
            refId: payload.refId,
            launchId: payload.launchId as string,
          },
        });
        return returnOpenAI;
      },
      async (error) => {
        await prisma.queue.update({
          where: {
            id: queueKeywords.id,
          },
          data: {
            status: "failed",
            response: JSON.stringify(error),
          },
        });
      },
    );
    return result;
  },
});
