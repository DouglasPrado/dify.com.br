"use client";
import { Media } from "@prisma/client";
import { Bolt, Combine, Database, PlaySquare, Sparkles } from "lucide-react";
import { useState } from "react";
import CollectionsActions from "../actions/collections-action";
import ConfigActions from "../actions/config-action";
import MagicToolsActions from "../actions/magic-action";
import MidiaActions from "../actions/midia-action";
import RelationshipsActions from "../actions/relationships-action";

export default function SidebarActions({
  medias,
  siteId,
}: {
  siteId: string;
  medias: Media[];
}) {
  const [select, setSelect] = useState("media");
  return (
    <div className="right-0 flex h-full w-full ">
      <div className="flex w-full flex-col">
        <div className="flex h-full max-h-screen w-full flex-col gap-3 overflow-y-auto border-l p-6">
          {select === "media" && <MidiaActions />}
          {select === "collections" && <CollectionsActions />}
          {select === "relationships" && <RelationshipsActions />}
          {select === "magictools" && <MagicToolsActions />}
          {select === "config" && <ConfigActions />}
        </div>
      </div>
      <div className="right-0 flex h-full min-h-screen w-[94px] max-w-full flex-col gap-6 bg-black p-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            onClick={() => setSelect("media")}
            className="flex h-[48px] w-[48px] items-center justify-center rounded-[6px] bg-stone-600 hover:bg-stone-700"
          >
            <PlaySquare width={32} strokeWidth={1} className="text-stone-50" />
          </button>
          <span className="text-[10px] text-stone-50">Imagens</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <button
            onClick={() => setSelect("magictools")}
            className="flex h-[48px] w-[48px] items-center justify-center rounded-[6px] bg-stone-600 hover:bg-stone-700"
          >
            <Sparkles width={32} strokeWidth={1} className="text-stone-50" />
          </button>
          <span className="text-[10px] text-stone-50">Magic Tools</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <button
            onClick={() => setSelect("collections")}
            className="flex h-[48px] w-[48px] items-center justify-center rounded-[6px] bg-stone-600 hover:bg-stone-700"
          >
            <Database width={32} strokeWidth={1} className="text-stone-50" />
          </button>
          <span className="text-[10px] text-stone-50">Coleções</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <button
            onClick={() => setSelect("relationships")}
            className="flex h-[48px] w-[48px] items-center justify-center rounded-[6px] bg-stone-600 hover:bg-stone-700"
          >
            <Combine width={32} strokeWidth={1} className="text-stone-50" />
          </button>
          <span className="text-[10px] text-stone-50">Relacionados</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <button
            onClick={() => setSelect("config")}
            className="flex h-[48px] w-[48px] items-center justify-center rounded-[6px] bg-stone-600 hover:bg-stone-700"
          >
            <Bolt width={32} strokeWidth={1} className="text-stone-50" />
          </button>
          <span className="text-[10px] text-stone-50">Configurações</span>
        </div>
      </div>
    </div>
  );
}
