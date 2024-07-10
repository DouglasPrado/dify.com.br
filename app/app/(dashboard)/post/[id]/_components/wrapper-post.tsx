"use client";
import Editor from "@/app/app/(dashboard)/post/[id]/_components/editor-post";
import SidebarActions from "@/app/app/(dashboard)/post/[id]/_components/sidebar/components/sidebar-actions";
import { getPostWithCollectionsAndRelatedPostsId } from "@/lib/actions/posts";
import { StudioContext } from "@/lib/contexts/StudioContext";
import { useContext, useEffect, useState } from "react";

export default function WrapperPost({ id }: { id: string }) {
  const { post, updatePost } = useContext(StudioContext);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getPostWithCollectionsAndRelatedPostsId(id).then((data: any) => {
      updatePost(data);
      setLoading(false);
    });
  }, [id, updatePost]);
  return (
    !loading && post && (
      <div className="flex w-full gap-3 overflow-y-hidden">
        <div className="w-full overflow-auto">
          <Editor />
        </div>
        <div className="fixed right-0 top-0 z-10 w-[476px] overflow-y-auto bg-white">
          <SidebarActions />
        </div>
      </div>
    )
  );
}
