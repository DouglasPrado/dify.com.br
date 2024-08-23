"use client";
import CreateTagModal from "@/components/modal/create-tag";
import { Input } from "@/components/ui/input";
import { useStudioStore } from "@/lib/stores/StudioStore";
import { Tag } from "lucide-react";
import { useEffect } from "react";
import CreateTagButton from "../components/create-tag-button";
import TagCard from "../components/tag-card";

export default function TagAction({ siteId }: { siteId: string }) {
  const [tags, getTags, filterTags] = useStudioStore((state) => [
    state.tags,
    state.getTags,
    state.filterTags,
  ]);

  useEffect(() => {
    getTags(siteId);
  }, [siteId, getTags]);
  return (
    <>
      <div className="flex w-full items-center gap-2 ">
        <Tag width={32} className="text-stone-800" />
        <h1 className="font-title text-xl text-stone-800">Tags</h1>
      </div>
      <p className="text-sm font-light text-stone-500">
        Adicione tags para facilitar a classificação do conteúdo.
      </p>
      <div className="flex w-full">
        <Input
          placeholder="Pesquisar..."
          onChange={(e: any) => {
            e.target.value === ""
              ? getTags(siteId)
              : filterTags(e.target.value);
          }}
        />
      </div>
      <div className="flex w-full">
        <CreateTagButton>
          <CreateTagModal />
        </CreateTagButton>
      </div>
      <div className="my-6 flex h-full  w-full flex-col gap-1 ">
        {tags ? (
          tags.map((tag: any, idx: number) => (
            <TagCard key={`key-tag-card-${idx}`} data={tag} />
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
