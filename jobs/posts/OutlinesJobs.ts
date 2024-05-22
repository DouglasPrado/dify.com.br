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
  id: "Outlines-job",
  name: "Create Outlines for Posts",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "post-outlines.create",
    schema: z.object({
      refId: z.string(),
      launchId: z.string().nullable(),
    }),
  }),
  integrations: {
    openai,
  },
  run: async (payload, io, ctx) => {
    await io.logger.info("🧪 Create Outlines for Posts");
    const post = await prisma.post.findUnique({
      where: {
        id: payload.refId,
      },
    });

    const result = io.try(
      async () => {
        if (post) {
          //@ts-ignore
          const keywords = post!.keywords?.keywords;
          const completion = await io.openai.chat.completions.backgroundCreate(
            "Generating Outlines for posts",
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
                  content: `
            Preciso que você gere outlines para criar o artigo sobre "${
              post!.title
            }" utlizando as keywords ${keywords}, 
            Tente usar contrações, expressões idiomáticas, frases de transição, interjeições, modificadores pendentes e coloquialismos e evite frases repetitivas e estruturas de frases não naturais. 
            Não faça uso de girias, palavras de conclusão e não utilize muitos emojis.
            Certifique-se de que o post esteja livre de plágio. 
            retorne um json { outlines: [ outline: "", description: "" ]}`,
                },
              ],
              model: "gpt-4-1106-preview",
              response_format: { type: "json_object" },
            },
          );

          const returnOpenAI: {
            outlines: { outline: string; description: string }[];
          } = JSON.parse(completion.choices[0].message?.content!);

          await Promise.all(
            returnOpenAI.outlines.map(
              async ({ outline, description }, idx: number) => {
                await client.sendEvent({
                  name: "post-parts.create",
                  payload: {
                    outline,
                    description,
                    refId: payload.refId,
                    order: idx,
                    launchId: payload.launchId as string,
                  },
                });
              },
            ),
          );
          await io.logger.info("🧪 Sending task for merge from outlines");
          await prisma.queue.create({
            data: {
              type: "post_merge",
              status: "waiting",
              refId: payload.refId,
              siteId: post.siteId as string,
              launchId: payload.launchId as string,
            },
          });
          return returnOpenAI;
        }
      },
      async (error) => {},
    );
    return result;
  },
});
