import prisma from "@/lib/prisma";
import type { NextRequest } from "next/server";
export const maxDuration = 150;
export const revalidate = 0;
export async function GET(request: NextRequest) {
  // Pega o primeiro item da fila que não foi finalizado e nem está em processo.
  console.log("Iniciando merge dos artigos");
  const queue = await prisma.queue.findFirst({
    where: {
      type: "post_merge",
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
    await prisma.queue.update({
      where: {
        id: queue.id,
      },
      data: {
        status: "processing",
      },
    });
    //Pega o post que foi pre-renderizado pela IA
    const blocks = await prisma.queue.findMany({
      where: {
        type: "post_partial",
        status: "complete",
        refId: queue.refId,
        NOT: {
          response: null,
        },
      },
      orderBy: {
        order: "asc",
      },
    });
    //Puxa todos os itens da fila com a referencia do post
    if (blocks.length > 0) {
      //Pega todos os conteúdos dos itens relacionado ao post
      let content: string = "";

      blocks.forEach((block: any) => {
        const parseBlock = JSON.parse(block.response!);
        //Faz o merge do conteúdo
        content = `${content}\n\n ${parseBlock.content}`;
      });

      try {
        //Salva no Post
        await prisma.post.update({
          where: {
            id: queue.refId!,
          },
          data: {
            content,
            published: true,
          },
        });
      } catch (error) {
        console.log(error);
      }

      try {
        //Altera a fila principal para complete.
        await prisma.queue.update({
          where: {
            id: queue.id,
          },
          data: {
            status: "complete",
            response: "OK",
          },
        });

        await prisma.queue.updateMany({
          where: {
            type: "post",
            status: "processing",
            refId: queue.refId,
          },
          data: {
            status: "complete",
            response: "OK",
          },
        });
      } catch (error) {
        console.log(error);
      }
      console.log("Finalizando o artigo");
    } else {
      return Response.json({ error: true, message: "Not Found Partials" });
    }

    return Response.json({
      error: false,
      message: "Update Queue with Success!",
    });
  }
  return Response.json({
    error: false,
    message: "Not Found Queue for this jobs",
  });
}
