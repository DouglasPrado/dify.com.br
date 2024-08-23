"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

export default function NextStepButton({ isPending }: any) {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  return (
    <div className="flex items-center gap-3">
      <Button
        size={"sm"}
        variant={"outline"}
        onClick={() => router.push(`/post/${id}/settings/knowledge`)}
      >
        {" "}
        Voltar etapa
      </Button>
      <button
        type="submit"
        className={cn(
          "flex h-8 w-56 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none sm:h-9",
          isPending
            ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
        )}
        disabled={isPending}
      >
        {isPending ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>Completar configurações</p>
        )}
      </button>
    </div>
  );
}
