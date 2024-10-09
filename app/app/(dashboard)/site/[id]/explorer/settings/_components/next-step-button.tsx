"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { Button } from "@/components/ui/button";
import { useKnowledgeStore } from "@/lib/stores/KnowledgeStore";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function NextStepButton() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [isPending, startTransition] = useTransition();
  const [type] = useKnowledgeStore((state) => [state.type]);
  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={() =>
          startTransition(async () => {
            va.track("Settings Post");
            console.log(type);
            router.refresh();
          })
        }
        className={cn(
          "min-w-40",
          isPending
            ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
        )}
        disabled={isPending}
      >
        {isPending ? <LoadingDots color="#808080" /> : <p>Salvar</p>}
      </Button>
    </div>
  );
}
