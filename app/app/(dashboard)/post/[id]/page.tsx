import Editor from "@/components/editor-post";
import PostSidebarActions from "@/components/post-sidebar-actions";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
    <div className="flex gap-3">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={70}>
          <Editor post={data} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30}>
          <PostSidebarActions siteId={data.site!.id} medias={medias} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
