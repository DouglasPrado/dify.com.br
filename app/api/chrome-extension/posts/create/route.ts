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
  if (validate) {
    const createPost = await prisma.post.create({
      data: {
        siteId: body.siteId,
        userId: validate.user.id,
      },
    });

    let post: any = await prisma.post.findFirst({
      where: {
        id: createPost.id,
      },
      select: {
        id: true,
        title: true,
        outlines: true,
      },
    });

    post = {
      ...post,
      datasets: [],
    };
    return NextResponse.json({
      success: true,
      post,
    });
  }
  return NextResponse.json({
    success: false,
    message: "Usuário não autenticado",
  });
}
