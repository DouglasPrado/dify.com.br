"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { addProducToFromCollectionId } from "@/lib/actions/collections";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { ListPlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
type AddProductCollectionProps = {
  productId: string;
};

export default function AddProductCollectionButton({
  productId,
}: AddProductCollectionProps) {
  const { id } = useParams() as { id: string };
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await addProducToFromCollectionId(id, productId);
          va.track("Add Product From Collection");
          toast.success(`Produto adicionado com sucesso.`);
          router.refresh()
        })
      }
      type="button"
      className={cn(
        "mb-4 flex h-8 w-14 items-center justify-center space-x-2 rounded-lg border text-sm transition-all first:ml-2 focus:outline-none sm:h-9",
        isPending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={isPending}
    >
      {isPending ? <LoadingDots color="#808080" /> : <ListPlus />}
    </button>
  );
}
