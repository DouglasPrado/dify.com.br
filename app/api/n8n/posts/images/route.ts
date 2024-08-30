import { uploadAndCompressImage } from "@/lib/fetchers";
import { getGoogleImages } from "@/lib/serper";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { search: string } },
) {
  // const body = await _req.json();
  const mock = {
    postId: "cm0grzj2v001iq3dpg9pm3zx4",
    serpId: "40bff0a8-43d5-42bf-95ca-37df9c91eb10",
    keyword: "Pai Rico Pai pobre Review",
  };
  const post = await prisma?.post.findFirst({
    where: { id: mock.postId },
  });
  const googleImages = await getGoogleImages(mock.keyword, post!.siteId!);

  const { url, blurhash } = await uploadAndCompressImage({
    url: googleImages.images[0].imageUrl,
    name: post?.title,
    size: { width: 1280, height: 720 },
  });

  await Promise.all(
    googleImages.images.map(async (image: any) => {
      const { url } = await uploadAndCompressImage({
        url: image.imageUrl,
        name: post?.title,
        size: { width: image.imageWidth, height: image.imageHeight },
      });
      await prisma?.media.create({
        data: {
          slug: url,
          siteId: post?.siteId,
          posts: { connect: { id: mock.postId } },
        },
      });
    }),
  );

  await prisma?.post.update({
    where: {
      id: mock.postId,
    },
    data: {
      image: url,
      imageBlurhash: blurhash,
    },
  });

  return NextResponse.json({ mock, googleImages });
}
