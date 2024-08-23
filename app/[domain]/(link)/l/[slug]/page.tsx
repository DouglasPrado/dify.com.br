import LinkPage from "@/components/page/link-page";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function SiteLink({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug);
  const data = await prisma.link.findFirst({
    where: { url: slug },
    include: {
      site: {
        select: {
          customDomain: true,
          id: true,
          name: true,
          description: true,
          image: true,
          imageBlurhash: true,
        },
      },
      collections: {
        include: {
          products: { select: { id: true, image: true, title: true } },
          posts: { select: { id: true, image: true, title: true } },
        },
      },
    },
  });
  if (!data) {
    notFound();
  }
  return (
    <>
      <LinkPage data={data} />
    </>
  );
}
