"use client";
import { Input } from "@/components/ui/input";
import { Bolt, PlaySquare } from "lucide-react";

export default function ConfigActions() {
  return (
    <>
      <div className="flex w-full items-center gap-2 ">
        <Bolt width={32} className="text-stone-800" />
        <h1 className="font-cal text-xl text-stone-800">Configurações</h1>
      </div>
      <div className="my-6 flex h-full  w-full flex-col gap-6 ">
        sem configurações
        <div className="flex items-center justify-center">
          <p className="text-xs text-stone-300">Fim de curso</p>
        </div>
      </div>
    </>
  );
}
