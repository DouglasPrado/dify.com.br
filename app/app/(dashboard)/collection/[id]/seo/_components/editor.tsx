"use client";
import NovelEditor from "@/components/editor/editor";
import { updateCollection } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { ArrowBigDownDash } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";

export default function Editor({ collection }: any) {
  let [isPendingSaving, startTransitionSaving] = useTransition();
  let [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState(collection);
  const handleSubmit = useCallback(() => {
    startTransitionSaving(async () => {
      await updateCollection(data);
    });
  }, [data]);
  // listen to CMD + S and override the default behavior
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "s") {
        e.preventDefault();
        handleSubmit();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [collection, startTransitionSaving, data, handleSubmit]);

  const handleOnChange = useCallback(
    (editor: any) => {
      console.log(editor.getJSON());
      setData((prev: any) => ({
        ...prev,
        footerDescription: editor?.storage?.markdown?.getMarkdown(),
      }));
      startTransitionSaving(async () => {
        await updateCollection(data);
      });
    },
    [data],
  );

  return (
    <div className="relative  w-full bg-stone-100 p-6 sm:mb-[calc(20vh)]  sm:rounded-lg dark:border-stone-700 ">
      <div className="flex items-center justify-between py-6">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <ArrowBigDownDash />
          <h1 className="w-60 truncate font-title text-xl font-bold sm:w-auto sm:text-xl dark:text-white">
            Conteúdo de rodapé
          </h1>
        </div>
        <button
          onClick={handleSubmit}
          className={cn(
            isPendingSaving
              ? "bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-500"
              : "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-300",
            "w-28 rounded-lg px-2 py-2 text-sm ",
          )}
        >
          {isPendingSaving ? "Salvando..." : "Salvar"}
        </button>
      </div>
      <NovelEditor
        initialValue={collection.content || ""}
        onChange={handleOnChange}
      />
    </div>
  );
}
