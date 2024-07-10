"use client";
import { Input } from "@/components/ui/input";
import { getCollectionsFromSiteId } from "@/lib/actions/collections";
import { Post } from "@prisma/client";
import { Database } from "lucide-react";
import { useEffect, useState } from "react";
import CollectionCard from "../components/collection-card";

export default function CollectionsAction({
  data,
  siteId,
}: {
  data: Post;
  siteId: string;
}) {
  const [collections, setCollections] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getCollectionsFromSiteId(siteId).then((data: any) => {
      setCollections(data);
      setLoading(false);
    });
  }, [siteId]);
  return (
    <>
      <div className="flex items-center gap-2  ">
        <Database width={32} className="text-stone-800" />
        <h1 className="font-title text-xl text-stone-800">Coleções</h1>
      </div>
      <div className="flex w-full">
        <Input placeholder="Pesquisar..." />
      </div>
      <div className="my-6 flex h-full  w-full flex-col gap-6 ">
        {!loading ? (
          collections &&
          collections.map((collection: any, idx: number) => (
            <CollectionCard
              key={`key-media-${idx}`}
              collection={collection}
              data={data}
            />
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
