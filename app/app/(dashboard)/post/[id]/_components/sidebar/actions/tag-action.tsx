"use client";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import CreateTagButton from "../components/create-tag-button";
import CreateTagModal from "@/components/modal/create-tag";

export default function TagAction() {
  return (
    <>
      <div className="flex w-full items-center gap-2 ">
        <Tag width={32} className="text-stone-800" />
        <h1 className="font-cal text-xl text-stone-800">Tags</h1>
      </div>
      <p className="text-sm font-light text-stone-500">
        Adicione tags para facilitar a classificação do conteúdo.
      </p>
      <div className="flex w-full">
        <CreateTagButton>
          <CreateTagModal />
        </CreateTagButton>
      </div>
      <div className="my-6 flex h-full  w-full flex-col gap-6 ">
        <div className="flex items-center justify-center">
          <p className="text-xs text-stone-300">Fim de curso</p>
        </div>
      </div>
    </>
  );
}
