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
  id: "launch-start",
  name: "Launch – Start",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "launch.start",
    schema: z.object({
      launch_id: z.string(),
    }),
  }),
  integrations: {
    openai,
  },
  run: async (payload, io) => {
    const launch = await prisma.launch.findFirst({
      where: {
        id: payload.launch_id,
      },
      include: {
        site: true,
      },
    });

    const result = io.try(
      async () => {
        if (launch) {
          const result = await io.openai.chat.completions.backgroundCreate(
            "Generating summary",
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
                  content: `O meu site de ${launch.site?.description} e o objetivo é criar artigos informacionais é pra aumentar a minha autoridade do tópico com o Google, mostrar pra ele que sou expert no assunto e ter melhores rankings.`,
                },
                {
                  role: "user",
                  content: `Preciso que você gere uma lista de ${launch.quantity} títulos falando sobre ${launch.description}, retornando a lista em json. { articles : [ { title: '' }]}`,
                },
              ],
              model: "gpt-4-1106-preview",
              response_format: { type: "json_object" },
            },
          );
          if (
            !result.choices ||
            !result.choices[0] ||
            !result.choices[0].message
          ) {
            io.logger.error("Failed to post. The content is undefined.");
            return;
          }
          const returnOpenAI: any = JSON.parse(
            result.choices[0].message?.content!,
          );

          const postForDays = +launch.quantity / +launch.period;

          //Criar tasks para gerar artigos
          await prisma.queue.createMany({
            data: [
              ...returnOpenAI?.articles?.map((article: any, idx: number) => {
                return {
                  type: "post",
                  description: `${article.title}`,
                  status: "waiting",
                  scheduleAt: addDays(
                    new Date(),
                    idx *
                      Math.round(1 / postForDays) *
                      Math.round(1 / postForDays),
                  ),
                  refId: launch.id,
                  siteId: launch.siteId,
                  launchId: launch.id as string,
                };
              }),
            ],
          });

          await prisma.launch.update({
            where: {
              id: launch.id,
            },
            data: {
              status: "processing",
            },
          });
          return result.choices[0].message;
        }
      },
      async (error) => {
        if (launch) {
          await prisma.launch.update({
            where: {
              id: launch.id,
            },
            data: {
              status: "failed",
            },
          });
        }
      },
    );
    return result;
  },
});
