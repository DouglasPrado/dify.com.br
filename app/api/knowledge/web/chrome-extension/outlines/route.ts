import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  const posts = await prisma.post.findMany();
  return NextResponse.json({
    success: true,
    posts,
  });
}

export async function POST(_req: NextRequest) {
  const body = await _req.json();
  try {
    await prisma.post.update({
      where: {
        id: body.postId,
      },
      data: {
        outlines: body.outlines,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({
    success: true,
  });
}
