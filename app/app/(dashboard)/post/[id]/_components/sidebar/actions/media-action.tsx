"use client";
import { Input } from "@/components/ui/input";
import { PlaySquare } from "lucide-react";
import ImageCard from "../components/image-card";

export default function MediaAction() {
  return (
    <>
      <div className="flex items-center gap-2  ">
        <PlaySquare width={32} className="text-stone-800" />
        <h1 className="font-cal text-xl text-stone-800">Imagens</h1>
      </div>
      <div className="flex w-full">
        <Input placeholder="Pesquisar..." />
      </div>
      <div className="my-3 flex h-full w-full flex-col gap-6 ">
        <ImageCard data={""} />
        <ImageCard data={""} />
        <ImageCard data={""} />
        <ImageCard data={""} />
        <ImageCard data={""} />
        <ImageCard data={""} />
        <ImageCard data={""} />
        <ImageCard data={""} />
        <ImageCard data={""} />
        <ImageCard data={""} />
        <ImageCard data={""} />
        <ImageCard data={""} />
        <ImageCard data={""} />
        <div className="flex items-center justify-center">
          <p className="text-xs text-stone-300">Fim de curso</p>
        </div>
      </div>
    </>
  );
}
