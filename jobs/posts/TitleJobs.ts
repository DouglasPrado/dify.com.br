// Your first job

import { client } from "@/trigger";
import { eventTrigger } from "@trigger.dev/sdk";
import { z } from "zod";

import { OpenAI } from "@trigger.dev/openai";

const openai: any = new OpenAI({
  id: "openai",
  apiKey: process.env.OPENAI_API_KEY!,
});

client.defineJob({
  id: "Title-job",
  name: "Create Title for Post",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "post-title.create",
    schema: z.object({
      postId: z.string(),
    }),
  }),
  integrations: {
    openai,
  },
  run: async (payload, io, ctx) => {
    await io.logger.info("🧪 Create Title for Post");
    const result = io.try(
      async () => {
        const reference = `Humanizar Texto incorpora as melhores práticas de SEO para garantir que seu conteúdo esteja otimizado para motores de busca. Isso inclui o uso estratégico de palavras-chave, meta descrições e links internos.`;
        const completion = await io.openai.createChatCompletion(
          "Generating title",
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
                content: `Preciso que você um título baseado nesse texto: "${reference}" para se posicionar na primeira página do Google.
                Retorne um json { title:  "" }`,
              },
            ],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object" },
          },
        );
        const returnOpenAI: {
          title: string;
        } = JSON.parse(completion.choices[0].message?.content!);
        await prisma?.post.update({
          where: { id: payload.postId },
          data: {
            title: returnOpenAI.title,
          },
        });
        return returnOpenAI;
      },
      async (error) => {
        console.log(error);
      },
    );
    return result;
  },
});
