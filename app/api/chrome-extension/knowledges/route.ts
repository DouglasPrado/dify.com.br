import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  const body = await _req.json();
  const post = await prisma.post.findFirst({
    where: {
      id: body.postId,
    },
  });

  try {
    if (post) {
      await prisma.reference.create({
        data: {
          title: body.title,
          content: body.content,
          postId: post?.id,
          reference: body.url,
          siteId: post?.siteId,
          type: "url",
        },
      });
      post.title === null &&
        (await prisma.post.update({
          where: { id: post?.id },
          data: { title: `${body.title.slice(0, 15)} (provisório)` },
        }));
    }
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({
    success: true,
  });
}
