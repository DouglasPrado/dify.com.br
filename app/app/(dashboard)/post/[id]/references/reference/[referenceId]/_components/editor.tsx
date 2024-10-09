"use client";
import NovelEditor from "@/components/editor/editor";
import DeleteReferenceForm from "@/components/form/delete-reference-form";
import BackButton from "@/components/global/back-button";
import { updateReference } from "@/lib/actions/reference";
import { cn } from "@/lib/utils";
import { Link2 } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";

export default function Editor({ reference }: any) {
  let [isPendingSaving, startTransitionSaving] = useTransition();
  let [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState(reference);
  const handleSubmit = useCallback(() => {
    startTransitionSaving(async () => {
      await updateReference(data);
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
  }, [reference, startTransitionSaving, data, handleSubmit]);

  const handleOnChange = useCallback(
    (editor: any) => {
      startTransitionSaving(async () => {
        setData((prev: any) => ({
          ...prev,
          title: data.title,
          content: editor?.storage?.markdown?.getMarkdown(),
        }));
        await updateReference(data);
      });
    },
    [data],
  );

  const handleTitleChange = useCallback((e: any) => {
    startTransitionSaving(async () => {
      setData((prev: any) => ({
        ...prev,
        title: e.target.value,
      }));
    });
  }, []);

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg  p-6 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:px-12 dark:border-stone-700 ">
      <div className="flex items-center justify-between pb-8">
        <div className="grid grid-cols-1 items-center justify-start gap-6 lg:flex lg:flex-row">
          <BackButton />
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
      <div className="flex items-center gap-3 pb-6">
        <input
          type="text"
          placeholder="Título para referência"
          defaultValue={data?.title}
          autoFocus
          onChange={handleTitleChange}
          className="dark:placeholder-text-600 w-full border-none px-0 font-title text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
        />
      </div>
      <NovelEditor initialValue={reference.content} onChange={handleOnChange} />
      <div className="flex py-12">
        <DeleteReferenceForm name={data.name} />
      </div>
    </div>
  );
}
