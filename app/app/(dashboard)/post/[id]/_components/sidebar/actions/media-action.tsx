"use client";
import { Input } from "@/components/ui/input";
import { useStudioStore } from "@/lib/stores/StudioStore";
import { PlaySquare } from "lucide-react";
import { useEffect } from "react";
import ImageCard from "../components/image-card";

export default function MediaAction({ siteId }: { siteId: string }) {
  const [media, getMedia] = useStudioStore((state) => [
    state.media,
    state.getMedia,
  ]);

  useEffect(() => {
    getMedia(siteId);
  }, [siteId, getMedia]);

  return (
    <>
      <div className="flex items-center gap-2  ">
        <PlaySquare width={32} className="text-stone-800" />
        <h1 className="font-title text-xl text-stone-800">Imagens</h1>
      </div>
      <div className="flex w-full">
        <Input placeholder="Pesquisar..." />
      </div>
      <div className="my-3 flex h-full w-full flex-col gap-6 ">
        {media ? (
          media.length > 0 &&
          media.map((media: any, idx: number) => (
            <ImageCard key={`key-media-${idx}`} data={media} />
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
