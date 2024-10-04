import Posts from "@/app/app/(dashboard)/site/[id]/contents/posts/_components/posts";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function SitePosts({
  params,
}: {
  params: { id: string };
}) {
  const siteId = decodeURIComponent(params.id);
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });
  const posts = await prisma.post.findMany({
    where: {
      userId: session.user.id as string,
      template: "empty",
      ...(siteId ? { siteId } : {}),
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      tags: true,
      site: true,
      products: true,
      medias: true,
    },
  });

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  return <Posts posts={posts} />;
}
