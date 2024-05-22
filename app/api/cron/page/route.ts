import prisma from "@/lib/prisma";
import type { NextRequest } from "next/server";
import OpenAI from "openai";
import { Client } from "typesense";

export const revalidate = 0;
export const maxDuration = 150;
const openai = new OpenAI({
  apiKey: `${process.env.OPENAI_API_KEY as string}`,
});

const clientTypesense = new Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST as string,
      port: Number(process.env.TYPESENSE_PORT) as number,
      protocol: process.env.TYPESENSE_PROTOCOL as string,
    },
  ],
  apiKey: process.env.TYPESENSE_ADMIN_API_KEY as string,
});

const socialSchema: any = {
  enable_nested_fields: true,
  fields: [
    { name: "id", type: "string" },
    { name: "title", type: "string", optional: true },
    { name: "description", type: "string", optional: true },
    { name: "type", type: "string", optional: true },
    { name: "image", type: "string", optional: true },
    { name: "imageBlurhash", type: "string", optional: true },
  ],
};

export async function GET(request: NextRequest) {
  // Pega o primeiro item da fila que não foi finalizado e nem está em processo.
  console.log("Iniciando a criação do página");
  await generateSocial();

  return Response.json({
    error: false,
    message: "Not Found Queue for this jobs",
  });
}

const generateSocial = async () => {
  const queue = await prisma.queue.findFirst({
    where: {
      scheduleAt: {
        lte: new Date(),
      },
      type: "page",
      NOT: {
        OR: [
          {
            status: "complete",
          },
          {
            status: "processing",
          },
        ],
      },
    },
  });
  if (queue) {
    try {
      // Atualiza a fila para avisar que o item está processando.
      await prisma.queue.update({
        where: {
          id: queue.id,
        },
        data: {
          status: "processing",
        },
      });

      console.log("Enviando parametros para I.A");
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Sou o redator principal de um site incrível de artigos que aborda uma variedade de tópicos interessantes. Sempre que escrevo, gosto de dar uma vibe descontraída e leve, usando uma linguagem amigável e divertida.
          Meu estilo é bastante pessoal, e eu costumo me expressar em primeira pessoa para criar uma conexão mais próxima com os leitores. Adoro fazer com que até os tópicos mais complexos pareçam simples e envolventes.
          `,
          },
          {
            role: "user",
            content: `Escreva um post para instagram 100% único, criativo e de estilo humano com no mínimo 200 palavras. 
          Para o assunto [${queue.description} ${queue.data}]. 
          Tente usar contrações, expressões idiomáticas, frases de transição, interjeições, modificadores pendentes e coloquialismos e evite frases repetitivas e estruturas de frases não naturais. 
          Não faça uso de girias e não utilize muitos emojis.
          Certifique-se de que o post esteja livre de plágio. 
          Não se esqueça de usar um ponto de interrogação no final das perguntas. 
          Tente usar [${queue.description}] e outras palavras-chave 2 a 3 vezes no post. 
          Adicione ao fim do post pelo menos 10 hastags.
          Escreva conteúdo que possa passar facilmente no teste das ferramentas de detecção de IA.
          Gere um JSON com o title, metadescription e content com o post`,
          },
        ],
        model: "gpt-4-turbo-preview",
        response_format: { type: "json_object" },
      });
      const returnOpenAI: {
        title: string;
        description: string;
        content: string;
      } = JSON.parse(completion.choices[0].message?.content!);

      //Pega o usuario base do negócio para adicionar como usuario
      const site = await prisma.site.findFirst({
        where: {
          id: queue.siteId,
        },
      });

      //Cria a postagem de acordo com a resposta da IA
      const social = await prisma.page.create({
        data: {
          title: JSON.stringify(returnOpenAI.title),
          description: JSON.stringify(returnOpenAI.description),
          content: JSON.stringify(returnOpenAI.content),
          siteId: queue.siteId,
          userId: site?.userId,
        },
      });
      const PAGE_COLLECTION = `${queue.siteId}`;
      try {
        await clientTypesense.collections(PAGE_COLLECTION).retrieve();
      } catch (error) {
        await clientTypesense
          .collections()
          .create({ ...socialSchema, name: PAGE_COLLECTION });
      }

      await clientTypesense
        .collections(PAGE_COLLECTION)
        .documents()
        .upsert({ ...social, type: "page" });

      await prisma.queue.create({
        data: {
          description: "page",
          data: returnOpenAI.title as string,
          refId: social.id as string,
          status: "waiting",
          type: "page",
          scheduleAt: queue.scheduleAt,
          siteId: site?.id as string,
          order: 1,
        },
      });

      // Atualiza a fila para completar o item
      await prisma.queue.update({
        where: {
          id: queue.id,
        },
        data: {
          status: "complete",
          refId: social.id,
          response: JSON.stringify(returnOpenAI),
        },
      });

      return Response.json({ social });
    } catch (error) {
      console.log(error);
      // Atualiza a fila para avisar que o item está processando.
      await prisma.queue.update({
        where: {
          id: queue.id,
        },
        data: {
          status: "failed",
        },
      });
    }
  }
};
