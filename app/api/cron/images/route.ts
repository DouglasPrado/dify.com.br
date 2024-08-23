import prisma from "@/lib/prisma";
import { getBlurDataURL } from "@/lib/utils";
import { Queue } from "@prisma/client";
import { put } from "@vercel/blob";
import got from "got";
import { nanoid } from "nanoid";
import OpenAI from "openai";
import { createClient } from "pexels";
const sharp = require("sharp");

const openai = new OpenAI({
  apiKey: `${process.env.OPENAI_API_KEY as string}`,
});

export const maxDuration = 150;
export const revalidate = 0;

const client = createClient(process.env.PEXELS_API as string);
export async function GET() {
  console.log("Iniciando a pesquisa de imagens");
  const queue: any = await prisma.queue.findFirst({
    where: {
      type: "image",
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
  let message = null;
  if (queue.description === "create image for article") {
    message = await getPostImage(queue);
  } else if (queue.description === "social_instagram") {
    message = await getSocialImage(queue);
  }

  return Response.json({
    error: false,
    message,
  });
}

const getPostImage = async (queue: Queue) => {
  if (queue) {
    console.log("Adicionando capa");
    try {
      const completion = await openai.images.generate({
        prompt: `Now I will give you a prompt for DALL-E. You will take the exact prompt I've given to you without any changes and create images using it. Make the images [1792x1024]
        3D-like realistic design of a [${queue.data}] for a thumbnail, featuring lifelike details, dynamic lighting, vivid colors, and a visually striking composition.
        WARNING: Avoid use Text or typography in Image.`,
        size: "1792x1024",
        model: "dall-e-3",
      });

      const imageUrl = completion.data[0].url as string;
      const imageBuffer = await got(imageUrl).buffer();
      const sharpData = await sharp(imageBuffer)
        .resize(1200, 820)
        .webp({ quality: 80 })
        .toBuffer();

      const filename = `${nanoid()}.webp`;
      const blob = await put(filename, sharpData, {
        access: "public",
      });
      const post = await prisma.post.findFirst({
        where: {
          id: queue.refId!,
        },
      });
      const imageBlur = await getBlurDataURL(blob.url);
      await prisma.post.update({
        where: { id: post!.id as string },
        data: {
          image: blob.url,
          imageBlurhash: imageBlur,
        },
      });
      await prisma.media.create({
        data: {
          slug: blob.url,
          type: "jpg",
          siteId: queue.siteId,
          metadata: {
            refId: queue.refId,
            type: "social",
          },
        },
      });
      await prisma.queue.update({
        where: {
          id: queue.id,
        },
        data: {
          status: "complete",
          response: JSON.stringify(imageUrl),
        },
      });
      return blob;
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
      return error;
    }
  } else {
    return "Não existe imagens para processar.";
  }
};

const getPostImageOld = async (queue: Queue) => {
  if (queue) {
    console.log("Adicionando capa");
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Preciso que você pegue essa frase: ${queue.data}
            e me dê apenas o substantivo da palavra mais importante.`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      const query = `${completion.choices[0].message?.content!}`;
      const searchImage: any = await client.photos.search({
        query,
        per_page: 1,
      });

      const imageBuffer = await got(
        searchImage.photos[0]?.src?.original,
      ).buffer();
      const sharpData = await sharp(imageBuffer)
        .resize(1024, 600)
        .webp({ quality: 80 })
        .toBuffer();

      const filename = `${nanoid()}.webp`;
      const blob = await put(filename, sharpData, {
        access: "public",
      });
      const post = await prisma.post.findFirst({
        where: {
          id: queue.refId!,
        },
      });
      const imageBlur = await getBlurDataURL(blob.url);
      await prisma.post.update({
        where: { id: post!.id as string },
        data: {
          image: blob.url,
          imageBlurhash: imageBlur,
        },
      });
      await prisma.media.create({
        data: {
          slug: blob.url,
          type: "jpg",
          siteId: queue.siteId,
          metadata: {
            refId: queue.refId,
            type: "social",
          },
        },
      });
      await prisma.queue.update({
        where: {
          id: queue.id,
        },
        data: {
          status: "complete",
          response: JSON.stringify(searchImage),
        },
      });
      return blob;
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
      return error;
    }
  } else {
    return "Não existe imagens para processar.";
  }
};

const getSocialImage = async (queue: Queue) => {
  if (queue) {
    console.log("Adicionando capa");
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Preciso que você pegue essa frase: ${queue.data}
            e me dê apenas o substantivo da palavra mais importante.`,
          },
        ],
        model: "gpt-4-1106-preview",
      });

      const query = `${completion.choices[0].message?.content!}`;
      const searchImage: any = await client.photos.search({
        query,
        per_page: 1,
      });

      const imageBuffer = await got(
        searchImage.photos[0]?.src?.original,
      ).buffer();

      const sharpData = await sharp(imageBuffer)
        .resize(500, 700)
        .webp({ quality: 80 })
        .toBuffer();

      const filename = `${nanoid()}.webp`;
      const blob = await put(filename, sharpData, {
        access: "public",
      });
      const social = await prisma.social.findFirst({
        where: {
          id: queue.refId!,
        },
      });
      const imageBlur = await getBlurDataURL(blob.url);
      await prisma.social.update({
        where: { id: social!.id as string },
        data: {
          image: blob.url,
          imageBlurhash: imageBlur,
        },
      });
      await prisma.media.create({
        data: {
          slug: blob.url,
          type: "jpg",
          siteId: queue.siteId,
          metadata: {
            refId: queue.refId,
            type: "social",
          },
        },
      });
      await prisma.queue.update({
        where: {
          id: queue.id,
        },
        data: {
          status: "complete",
          response: JSON.stringify(searchImage),
        },
      });
      return blob;
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
      return error;
    }
  } else {
    return "Não existe imagens para processar.";
  }
};

const getSocialImageOld = async (queue: Queue) => {
  if (queue) {
    console.log("Adicionando capa");
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Preciso que você pegue essa frase: ${queue.data}
            e me dê um substantivo comum e um adjetivo crie uma frase com apenas duas palavras em ingles responda somente com a frase`,
          },
        ],
        model: "gpt-4-1106-preview",
      });

      const query = `${"Abstract Colorful"}`;
      const searchImage: any = await client.photos.search({
        query,
        per_page: 1,
      });

      console.log(query, searchImage);

      const imageBuffer = await got(
        searchImage.photos[0]?.src?.original,
      ).buffer();

      const svg_buffer =
        Buffer.from(`<svg width="239" height="74" viewBox="0 0 74 76">
      <!--this rect should have rounded corners-->
      <rect x="0" y="0" width="100%" height="100%" fill="#fff"/>
      <text x="50%" y="50%" text-anchor="middle" dy="0.75em" fill="#000">${queue.data}</text>
</svg>`);
      const sharpData = await sharp(imageBuffer)
        .composite([
          { input: "./public/notes.png" },
          {
            input: svg_buffer,
          },
        ])
        .sharpen()
        .resize(500, 700)
        .webp({ quality: 80 })
        .toBuffer();

      const filename = `${nanoid()}.webp`;
      const blob = await put(filename, sharpData, {
        access: "public",
      });
      const social = await prisma.social.findFirst({
        where: {
          id: queue.refId!,
        },
      });
      const imageBlur = await getBlurDataURL(blob.url);
      await prisma.social.update({
        where: { id: social!.id as string },
        data: {
          image: blob.url,
          imageBlurhash: imageBlur,
        },
      });
      await prisma.queue.update({
        where: {
          id: queue.id,
        },
        data: {
          status: "complete",
          response: JSON.stringify(searchImage),
        },
      });
      return blob;
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
      return error;
    }
  } else {
    return "Não existe imagens para processar.";
  }
};
