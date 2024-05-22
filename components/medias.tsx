"use client";
import { Media } from "@prisma/client";
import Image from "next/image";
import GridMasonry from "./grid-masonry";
import { ScrollArea } from "./ui/scroll-area";

export default function Medias({ medias }: { medias: Media[] }) {
  return medias.length > 0 ? (
    <ScrollArea className="flex h-full w-full pt-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <GridMasonry medias={medias} />
      </div>
    </ScrollArea>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">Você não tem nenhum conteúdo</h1>
      <Image alt="missing post" src="/content.svg" width={400} height={400} />
      <p className="text-lg text-stone-500">
        Você ainda não tem postagens. Crie um para começar.
      </p>
    </div>
  );
}
