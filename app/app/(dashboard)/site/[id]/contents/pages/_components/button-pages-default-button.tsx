"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { createPageAI } from "@/lib/actions/pages";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function PagesDefaultButton() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-3  sm:flex-row">
      <button
        onClick={() =>
          startTransition(async () => {
            const page = await createPageAI("Page.About", id);
            router.refresh();
          })
        }
        className={cn(
          "flex h-8 items-center justify-center space-x-2 rounded-lg border px-5 text-sm transition-all focus:outline-none sm:h-9",
          isPending
            ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
        )}
        disabled={isPending}
      >
        {isPending ? <LoadingDots color="#808080" /> : <p>Sobre</p>}
      </button>
      <button
        onClick={() =>
          startTransition(async () => {
            const page = await createPageAI("Page.Disclaimer", id);
            router.refresh();
          })
        }
        className={cn(
          "flex h-8 items-center justify-center space-x-2 rounded-lg border px-5 text-sm transition-all focus:outline-none sm:h-9",
          isPending
            ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
        )}
        disabled={isPending}
      >
        {isPending ? <LoadingDots color="#808080" /> : <p>Disclaimer</p>}
      </button>
      <button
        onClick={() =>
          startTransition(async () => {
            const page = await createPageAI("Page.PrivacyPolicy", id);
            router.refresh();
          })
        }
        className={cn(
          "flex h-8 items-center justify-center space-x-2 rounded-lg border px-5 text-sm transition-all focus:outline-none sm:h-9",
          isPending
            ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
        )}
        disabled={isPending}
      >
        {isPending ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>Políticas de privacidade</p>
        )}
      </button>
      <button
        onClick={() =>
          startTransition(async () => {
            const page = await createPageAI("Page.TermUse", id);
            router.refresh();
          })
        }
        className={cn(
          "flex h-8 items-center justify-center space-x-2 rounded-lg border px-5 text-sm transition-all focus:outline-none sm:h-9",
          isPending
            ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
        )}
        disabled={isPending}
      >
        {isPending ? <LoadingDots color="#808080" /> : <p>Termos de uso</p>}
      </button>
    </div>
  );
}
