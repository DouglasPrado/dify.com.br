"use client";

import NovelEditor from "@/components/editor/editor";
import { updatePage, updatePageMetadata } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Page } from "@prisma/client";
import { ExternalLink } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import LoadingDots from "../../../../../../components/icons/loading-dots";

type PageWithSite = Page & { site: { subdomain: string | null } | null };

export default function EditorPage({ page }: { page: any }) {
  let [isPendingSaving, startTransitionSaving] = useTransition();
  let [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState<PageWithSite>(page);
  const [hydrated, setHydrated] = useState(false);

  const url = process.env.NEXT_PUBLIC_VERCEL_ENV
    ? `https://${data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`
    : `http://${data.site?.subdomain}.localhost:3000/${data.slug}`;

  // listen to CMD + S and override the default behavior
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "s") {
        e.preventDefault();
        startTransitionSaving(async () => {
          await updatePage(data);
        });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [data, startTransitionSaving]);

  const handleOnChange = useCallback(
    (editor: any) => {
      console.log(editor.getJSON());
      setData((prev: any) => ({
        ...prev,
        content: editor?.storage?.markdown?.getMarkdown(),
      }));
      startTransitionSaving(async () => {
        await updatePage(data);
      });
    },
    [data],
  );

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg  p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:px-12 dark:border-stone-700">
      <div className="absolute right-5 top-5 mb-5 flex items-center space-x-3">
        {data.published && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-stone-400 hover:text-stone-500"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        <div className="rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-stone-800 dark:text-stone-500">
          {isPendingSaving ? "Salvando..." : "Salvar"}
        </div>
        <button
          onClick={() => {
            const formData = new FormData();
            formData.append("published", String(!data.published));
            startTransitionPublishing(async () => {
              await updatePageMetadata(formData, page.id, "published").then(
                () => {
                  toast.success(
                    `Successfully ${
                      data.published ? "unpublished" : "published"
                    } your page.`,
                  );
                  setData((prev: any) => ({
                    ...prev,
                    published: !prev.published,
                  }));
                },
              );
            });
          }}
          className={cn(
            "flex h-7 w-24 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none",
            isPendingPublishing
              ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
              : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
          )}
          disabled={isPendingPublishing}
        >
          {isPendingPublishing ? (
            <LoadingDots />
          ) : (
            <p>{data.published ? "Rascunho" : "Publicar"}</p>
          )}
        </button>
      </div>
      <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5 dark:border-stone-700">
        <input
          type="text"
          placeholder="Título"
          defaultValue={page?.title || ""}
          autoFocus
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="dark:placeholder-text-600 border-none px-0 font-title text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
        />
        <TextareaAutosize
          placeholder="Descrição"
          defaultValue={page?.description || ""}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="dark:placeholder-text-600 w-full resize-none border-none px-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
        />
      </div>
      <NovelEditor
        initialValue={page.content || ""}
        onChange={handleOnChange}
      />
    </div>
  );
}
