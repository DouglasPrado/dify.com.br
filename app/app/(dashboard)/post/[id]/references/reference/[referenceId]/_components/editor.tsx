"use client";
import NovelEditor from "@/components/editor/editor";
import BackButton from "@/components/global/back-button";
import { updateContentTunning } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Link2 } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";

export default function Editor({ reference }: any) {
  let [isPendingSaving, startTransitionSaving] = useTransition();
  let [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState(reference);
  const handleSubmit = useCallback(() => {
    startTransitionSaving(async () => {
      await updateContentTunning(reference.id, data);
    });
  }, [data, reference.id]);
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
  }, [reference, startTransitionSaving, data, handleSubmit]);

  const handleOnChange = useCallback(
    (editor: any) => {
      console.log(editor.getJSON());
      setData((prev: any) => ({
        ...prev,
        content: editor?.storage?.markdown?.getMarkdown(),
      }));
      startTransitionSaving(async () => {
        await updateContentTunning(reference.id, data);
      });
    },
    [data],
  );

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg  p-6 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:px-12 dark:border-stone-700 ">
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-1 items-center justify-start gap-6 lg:flex lg:flex-row">
          <BackButton>Voltar</BackButton>
          <div className="flex flex-col">
            <h1 className="flex items-center gap-3 font-title text-2xl">
              <Link2 /> Referência
            </h1>
            <p className="flex">
              Faça uma sessão para adicionar artigos no seu link
            </p>
          </div>
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
      <NovelEditor initialValue={reference.content} onChange={handleOnChange} />
    </div>
  );
}
