"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { cloneProductFromGoogle } from "@/lib/actions/product";
import { SerpProduct } from "@/lib/serper";
import { useSiteStore } from "@/lib/stores/SiteStore";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function CreateProductCloneGoogle({
  product,
}: {
  product: SerpProduct;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [siteId] = useSiteStore((state) => [state.siteId]);
  return (
    <button
      onClick={() =>
        startTransition(async () => {
          const cloned: any =
            siteId && (await cloneProductFromGoogle(siteId, product));
          cloned.error
            ? toast.error(`${cloned.error}`)
            : toast.success(`Produto clonado com sucesso!`);
          router.refresh();
        })
      }
      className={cn(
        "flex h-8 w-full items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none sm:h-9",
        isPending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={isPending}
    >
      {isPending ? (
        <LoadingDots color="#808080" />
      ) : (
        <p>Criar produto a partir desse</p>
      )}
    </button>
  );
}
