import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  const body = await _req.json();
  if (!body.token) {
    throw new Error("Necessário enviar o token");
  }

  const validate = await prisma.chromeExtension.findFirst({
    where: {
      token: body.token,
    },
    select: {
      user: {
        select: { id: true },
      },
    },
  });

  if (!!validate?.user.id) {
    let posts: any = await prisma.post.findMany({
      where: {
        siteId: body.siteId,
      },
      select: {
        id: true,
        title: true,
        outlines: true,
        knowledges: { select: { id: true, title: true, type: true } },
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });
    posts = posts?.map((post: any) => ({
      ...post,
      datasets: post.references,
      knowledges: undefined, // Remove o campo original se não for necessário
    }));
    return NextResponse.json({
      success: true,
      posts,
    });
  }
  return NextResponse.json({
    success: false,
    message: "Usuário não autenticado",
  });
}
