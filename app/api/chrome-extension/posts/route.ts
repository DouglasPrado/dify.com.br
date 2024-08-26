import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  let posts: any = await prisma.post.findMany({
    where: {
      siteId: "clwpfwswp0006q3cu8pae6iee",
    },
    select: {
      id: true,
      title: true,
      outlines: true,
      references: { select: { id: true, title: true, type: true } },
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
  posts = posts.map((post: any) => ({
    ...post,
    datasets: post.references,
    references: undefined, // Remove o campo original se não for necessário
  }));
  return NextResponse.json({
    success: true,
    posts,
  });
}

export async function POST(_req: NextRequest) {
  const body = await _req.json();
  const createPost = await prisma.post.create({
    data: {
      siteId: body.siteId,
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
