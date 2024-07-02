"use client";
import { Input } from "@/components/ui/input";
import { Combine } from "lucide-react";
import RelationshipCard from "../components/relationship-card";

export default function RelationshipsAction() {
  return (
    <>
      <div className="flex items-center gap-2  ">
        <Combine width={32} className="text-stone-800" />
        <h1 className="font-cal text-xl text-stone-800">Relacionados</h1>
      </div>
      <div className="flex w-full">
        <Input placeholder="Pesquisar..." />
      </div>
      <div className="my-6 flex h-full  w-full flex-col gap-6 ">
        <RelationshipCard />
        <div className="flex items-center justify-center">
          <p className="text-xs text-stone-300">Fim de curso</p>
        </div>
      </div>
    </>
  );
}
