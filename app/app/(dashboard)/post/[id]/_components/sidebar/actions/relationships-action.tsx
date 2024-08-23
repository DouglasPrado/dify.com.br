"use client";
import { Input } from "@/components/ui/input";
import { useStudioStore } from "@/lib/stores/StudioStore";
import { Combine } from "lucide-react";
import { useEffect } from "react";
import RelationshipCard from "../components/relationship-card";

export default function RelationshipsAction({
  data,
  siteId,
}: {
  data: any;
  siteId: string;
}) {
  const [relatedPosts, getRelatedPosts, filterRelatedPosts] = useStudioStore(
    (state) => [
      state.relatedPosts,
      state.getRelatedPosts,
      state.filterRelatedPosts,
    ],
  );

  useEffect(() => {
    getRelatedPosts(data.id, siteId);
  }, [siteId, getRelatedPosts, data.id]);

  return (
    <>
      <div className="flex items-center gap-2  ">
        <Combine width={32} className="text-stone-800" />
        <h1 className="font-title text-xl text-stone-800">Relacionados</h1>
      </div>
      <div className="flex w-full">
        <Input
          placeholder="Pesquisar..."
          onChange={(e: any) => {
            e.target.value === ""
              ? getRelatedPosts(data.id, siteId)
              : filterRelatedPosts(e.target.value);
          }}
        />
      </div>
      <div className="my-6 flex h-full  w-full flex-col gap-6 ">
        {relatedPosts ? (
          relatedPosts.map((post: any, idx: number) => (
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
