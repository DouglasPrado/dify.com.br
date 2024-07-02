"use client";
import { Input } from "@/components/ui/input";
import { Collection } from "@prisma/client";
import { Database } from "lucide-react";
import CollectionCard from "../components/collection-card";

export default function CollectionsAction({
  collections,
}: {
  collections: Collection[];
}) {
  return (
    <>
      <div className="flex items-center gap-2  ">
        <Database width={32} className="text-stone-800" />
        <h1 className="font-cal text-xl text-stone-800">Coleções</h1>
      </div>
      <div className="flex w-full">
        <Input placeholder="Pesquisar..." />
      </div>
      <div className="my-6 flex h-full  w-full flex-col gap-6 ">
        {collections.map((collection, idx) => (
          <CollectionCard key={`key-media-${idx}`} collection={collection} />
        ))}

        <div className="flex items-center justify-center">
          <p className="text-xs text-stone-300">Fim de curso</p>
        </div>
      </div>
    </>
  );
}
