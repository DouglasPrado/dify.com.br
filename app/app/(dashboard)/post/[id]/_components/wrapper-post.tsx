"use client";
import Editor from "@/app/app/(dashboard)/post/[id]/_components/editor-post";
import SidebarActions from "@/app/app/(dashboard)/post/[id]/_components/sidebar/components/sidebar-actions";
import { useStudioStore } from "@/lib/stores/StudioStore";
import { useEffect } from "react";

export default function WrapperPost({ id }: { id: string }) {
  const [post, getPost] = useStudioStore((state) => [
    state.post,
    state.getPost,
  ]);

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return (
    post && (
      <div className="flex w-full gap-3 overflow-y-hidden">
        <div className="w-full overflow-auto">
          <Editor />
        </div>
        <div className="fixed right-0 top-0 z-10 hidden w-[476px] overflow-y-auto bg-white sm:flex">
          <SidebarActions />
        </div>
      </div>
    )
  );
}
