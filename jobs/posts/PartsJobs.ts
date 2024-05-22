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
  id: "Parts-job",
  name: "Create Parts for Posts",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "post-parts.create",
    schema: z.object({
      outline: z.string(),
      description: z.string(),
      refId: z.string(),
      launchId: z.string().nullable(),
      order: z.number(),
    }),
  }),
  integrations: {
    openai,
  },
  run: async (payload, io, ctx) => {
    await io.logger.info("🧪 Create Parts for Posts");

    const post = await prisma.post.findFirst({
      where: {
        id: payload.refId as string,
      },
    });

    if (post) {
      let queue = await prisma.queue.findFirst({
        where: {
          type: "post_partial",
          description: payload.outline,
          data: payload.description,
          order: payload.order,
        },
      });
      if (!queue) {
        queue = await prisma.queue.create({
          data: {
            type: "post_partial",
            status: "waiting",
            description: payload.outline,
            data: payload.description,
            scheduleAt: new Date(),
            refId: payload.refId,
            siteId: post.siteId as string,
            order: payload.order,
            launchId: payload.launchId as string,
          },
        });
      }

      const result = io.try(
        async () => {
          //@ts-ignore
          const keywords = post!.keywords?.keywords;
          await io.logger.info("Enviando contexto do artigo para IA");
          const completion = await io.openai.chat.completions.backgroundCreate(
            "Generating parts for Posts",
            {
              messages: [
                {
                  role: "system",
                  content: `Sou o redator principal de um site incrível de artigos que aborda uma variedade de tópicos interessantes. Sempre que escrevo, gosto de dar uma vibe descontraída e leve, usando uma linguagem amigável e divertida.
            Meu estilo é bastante pessoal, e eu costumo me expressar em primeira pessoa para criar uma conexão mais próxima com os leitores. Adoro fazer com que até os tópicos mais complexos pareçam simples e envolventes.
            `,
                },
                {
                  role: "user",
                  content: `Desenvolva o tópico ${payload.outline} em um artigo curto 100% único, criativo e de estilo humano com no mínimo 300 palavras. 
            ${payload.description}
            Tente usar contrações, expressões idiomáticas, frases de transição, interjeições, modificadores pendentes e coloquialismos e evite frases repetitivas e estruturas de frases não naturais. 
            Adicione marcadores ou uma lista numerada, se necessário. 
            Evite criar texto com introduções, conclusões ou perguntas e sempre deixe o assunto aberto. 
            Certifique-se de que o artigo esteja livre de plágio. 
            Não se esqueça de usar um ponto de interrogação no final em perguntas. 
            Utilize pelo menos 2 palavras-chave que vou te passar a seguir: ${keywords}
            Tente não alterar muito o título ao escrever o título. 
            Escreva conteúdo que possa passar facilmente no teste das ferramentas de detecção de IA.
            Gere um JSON com o title, description e content com o artigo escrito em markdown onde titulos h2 e subtitulos h3`,
                },
              ],
              model: "gpt-4-1106-preview",
              response_format: { type: "json_object" },
            },
          );

          const returnOpenAI: {
            title: string;
            content: string;
          } = JSON.parse(completion.choices[0].message?.content!);
          // Atualiza a fila para completar o item e adiciona resposta
          await prisma.queue.update({
            where: {
              id: queue!.id,
            },
            data: {
              status: "complete",
              response: JSON.stringify(returnOpenAI),
            },
          });
          return returnOpenAI;
        },
        async (error) => {
          if (queue) {
            await prisma.queue.update({
              where: {
                id: queue.id,
              },
              data: {
                status: "failed",
                response: JSON.stringify(error),
              },
            });
          }
        },
      );
      return result;
    }
  },
});
