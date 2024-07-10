"use client";
import { Input } from "@/components/ui/input";
import { getPostsWithoutIdFromSiteId } from "@/lib/actions/posts";
import { Combine } from "lucide-react";
import { useEffect, useState } from "react";
import RelationshipCard from "../components/relationship-card";

export default function RelationshipsAction({
  data,
  siteId,
}: {
  data: any;
  siteId: string;
}) {
  const [posts, setPosts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getPostsWithoutIdFromSiteId(data.id, siteId).then((data: any) => {
      setPosts(data);
      setLoading(false);
    });
  }, [siteId]);
  return (
    <>
      <div className="flex items-center gap-2  ">
        <Combine width={32} className="text-stone-800" />
        <h1 className="font-title text-xl text-stone-800">Relacionados</h1>
      </div>
      <div className="flex w-full">
        <Input placeholder="Pesquisar..." />
      </div>
      <div className="my-6 flex h-full  w-full flex-col gap-6 ">
        {!loading ? (
          posts &&
          posts.map((post: any, idx: number) => (
            <RelationshipCard key={`key-post-${idx}`} data={data} post={post} />
          ))
        ) : (
          <p className="text-center text-sm text-stone-400">Carregando...</p>
        )}

        <div className="flex items-center justify-center">
          <p className="text-xs text-stone-300">Fim de curso</p>
        </div>
      </div>
    </>
  );
}
