import Editor from "@/app/app/(dashboard)/post/[id]/_components/editor-post";
import SidebarActions from "@/app/app/(dashboard)/post/[id]/_components/sidebar/components/sidebar-actions";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function PostPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await prisma.post.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      site: {
        select: {
          id: true,
          subdomain: true,
        },
      },
    },
  });

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const medias = await prisma.media.findMany({
    where: {
      ...(data.siteId ? { siteId: data.siteId } : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      site: true,
    },
  });

  return (
    <div className="flex w-full gap-3 overflow-y-hidden">
      <div className="w-full overflow-auto">
        <Editor post={data} />
      </div>
      <div className="fixed right-0 top-0 w-[476px] overflow-y-auto">
        <SidebarActions siteId={data.site!.id} medias={medias} />
      </div>
    </div>
  );
}
