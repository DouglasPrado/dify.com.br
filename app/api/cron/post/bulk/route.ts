import prisma from "@/lib/prisma";
import { client } from "@/trigger";
import type { NextRequest } from "next/server";
import OpenAI from "openai";
import slugify from "slugify";
import { Client } from "typesense";

export const maxDuration = 150;
export const revalidate = 0;
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

const postsSchema: any = {
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
  console.log("Iniciando a criação do artigo");
  await createArticle();

  return Response.json({
    error: false,
    message: "Not Found Queue for this jobs",
  });
}

const createArticle = async () => {
  //Pega o item da fila do POST
  const queue = await prisma.queue.findFirst({
    where: {
      scheduleAt: {
        lte: new Date(),
      },
      type: "post",
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

      //Pega o usuario base do negócio para adicionar como usuario
      const site = await prisma.site.findFirst({
        where: {
          id: queue.siteId,
        },
      });

      //Cria o post vazio
      const post = await prisma.post.create({
        data: {
          title: queue.description,
          slug: slugify(queue.description as string, {
            replacement: "-", // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true, // convert to lower case, defaults to `false`
            strict: true, // strip special characters except replacement, defaults to `false`
            trim: true, // trim leading and trailing replacement chars, defaults to `true`
          }),
          launchId: queue.refId,
          siteId: queue.siteId,
          userId: site?.userId,
        },
      });
      if (post) {
        if (!post.keywords) {
          await client.sendEvent({
            name: "post-keywords.create",
            payload: {
              description: `${post.title}`,
              refId: post.id,
              siteId: post.siteId,
              launchId: post.launchId,
            },
          });
        }
        await prisma.queue.update({
          where: {
            id: queue.id,
          },
          data: {
            refId: post.id,
          },
        });
        await prisma.queue.create({
          data: {
            description: "create image for article",
            data: post.title,
            refId: post.id,
            status: "waiting",
            type: "image",
            scheduleAt: queue.scheduleAt,
            siteId: post.siteId as string,
            launchId: post.launchId as string,
          },
        });
      }

      const POST_COLLECTION = `${queue.siteId}`;
      try {
        await clientTypesense.collections(POST_COLLECTION).retrieve();
      } catch (error) {
        await clientTypesense
          .collections()
          .create({ ...postsSchema, name: POST_COLLECTION });
      }
      await clientTypesense
        .collections(POST_COLLECTION)
        .documents()
        .upsert({ ...post, type: "post" });

      return Response.json({ post });
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
