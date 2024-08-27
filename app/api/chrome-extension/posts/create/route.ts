import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Client } from "typesense";

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
    { name: "type", type: "string", optional: true, facet: true },
    { name: "published", type: "bool", optional: true, facet: true },
    { name: "image", type: "string", optional: true },
    { name: "imageBlurhash", type: "string", optional: true },
    { name: "tags", type: "string[]", optional: true, facet: true },
    { name: "collections", type: "string[]", optional: true, facet: true },
  ],
};

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
    const POST_COLLECTION: string = `${body.siteId}`;
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
      .upsert({ ...createPost, type: "post" });

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
