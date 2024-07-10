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
      collections: true,
      relatedPosts: {
        include: {
          relatedPost: true,
        },
      },
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

  return (
    <div className="flex w-full gap-3 overflow-y-hidden">
      <div className="w-full overflow-auto">
        <Editor post={data} />
      </div>
      <div className="fixed right-0 top-0 z-10 w-[476px] overflow-y-auto bg-white">
        <SidebarActions data={data} />
      </div>
    </div>
  );
}
