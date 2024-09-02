import { uploadAndCompressImage } from "@/lib/fetchers";
import { getGoogleImages } from "@/lib/serper";
import { NextResponse } from "next/server";

export async function POST(_req: Request) {
  const body = await _req.json();

  const post = await prisma?.post.findFirst({
    where: { id: body.postId },
  });

  const googleImages = await getGoogleImages(body.keyword, post!.siteId!);

  const { url, blurhash } = await uploadAndCompressImage({
    url: googleImages.images[0].imageUrl,
    name: post?.title,
    size: { width: 1280, height: 720 },
  });

  await prisma?.post.update({
    where: {
      id: body.postId,
    },
    data: {
      image: url,
      imageBlurhash: blurhash,
    },
  });

  await Promise.all(
    googleImages.images.map(async (image: any) => {
      const { url } = await uploadAndCompressImage({
        url: image.imageUrl,
        name: `${post?.title} ${image.title}`,
        size: { width: image.imageWidth, height: image.imageHeight },
      });
      await prisma?.media.create({
        data: {
          slug: url,
          siteId: post?.siteId,
          posts: { connect: { id: body.postId } },
        },
      });
    }),
  );

  return NextResponse.json({ body });
}
