"use client";
import {
  Bolt,
  Combine,
  Database,
  ImagePlay,
  Sparkles,
  Tag,
} from "lucide-react";

import { useStudioStore } from "@/lib/stores/StudioStore";
import { useState } from "react";
import CollectionsAction from "../actions/collections-action";
import ConfigAction from "../actions/config-action";
import MagicToolsAction from "../actions/magic-action";
import MediaAction from "../actions/media-action";
import RelationshipsAction from "../actions/relationships-action";
import TagAction from "../actions/tag-action";

export default function SidebarActions() {
  const [post] = useStudioStore((state: any) => [state.post]);
  const [select, setSelect] = useState("magictools");
  return (
    <div className="right-0 flex h-full w-full ">
      <div className="flex w-full flex-col">
        <div className="flex h-full max-h-screen w-full flex-col gap-3 overflow-y-auto border-l p-6">
          {select === "media" && <MediaAction siteId={post!.siteId!} />}
          {select === "collections" && (
            <CollectionsAction siteId={post!.siteId!} data={post} />
          )}
          {select === "relationships" && (
            <RelationshipsAction data={post} siteId={post!.siteId!} />
          )}
          {select === "magictools" && (
            <MagicToolsAction siteId={post!.siteId!} />
          )}{" "}
          {select === "tags" && <TagAction siteId={post!.siteId!} />}
          {select === "config" && <ConfigAction />}
        </div>
      </div>
      <div className="right-0 flex h-full min-h-screen w-[94px] max-w-full flex-col gap-6 bg-black p-4">
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
            onClick={() => setSelect("media")}
            className="flex h-[48px] w-[48px] items-center justify-center rounded-[6px] bg-stone-600 hover:bg-stone-700"
          >
            <ImagePlay width={32} strokeWidth={1} className="text-stone-50" />
          </button>
          <span className="text-[10px] text-stone-50">Imagens</span>
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
            onClick={() => setSelect("tags")}
            className="flex h-[48px] w-[48px] items-center justify-center rounded-[6px] bg-stone-600 hover:bg-stone-700"
          >
            <Tag width={32} strokeWidth={1} className="text-stone-50" />
          </button>
          <span className="text-[10px] text-stone-50">Tags</span>
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
