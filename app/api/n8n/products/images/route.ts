import { uploadAndCompressImage } from "@/lib/fetchers";
import prisma from "@/lib/prisma";
import { getGoogleImages } from "@/lib/serper";
import { NextResponse } from "next/server";

export async function POST(_req: Request) {
  const body = await _req.json();

  const product = await prisma?.product.findFirst({
    where: { id: body.productId },
  });

  const googleImages = await getGoogleImages(body.keyword, product!.siteId!);
  const { url, blurhash } = await uploadAndCompressImage({
    url: googleImages.images[0].imageUrl,
    name: product?.title,
    size: { width: 1280, height: 720 },
  });

  await prisma?.product.update({
    where: {
      id: product!.id,
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
        name: `${product?.title} ${image.title}`,
        size: { width: image.imageWidth, height: image.imageHeight },
      });
      await prisma?.media.create({
        data: {
          slug: url,
          siteId: product?.siteId,
          products: { connect: { id: product!.id } },
        },
      });
    }),
  );

  return NextResponse.json({ body });
}
