"use client";

import { deleteProductSection } from "@/lib/actions/product-sections";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import LoadingDots from "../icons/loading-dots";

export default function DeleteProductSectionForm({ id }: { id: string }) {
  const { pending } = useFormStatus();
  const router = useRouter();
  return (
    <button
      onClick={() => {
        deleteProductSection(id).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track("Deleted Section");
            router.refresh();
            toast.success(`Successfully deleted section!`);
          }
        });
      }}
      className={cn(
        "flex h-8 items-center justify-center space-x-2 rounded-md border px-4 text-xs transition-all focus:outline-none sm:h-8",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600 dark:hover:bg-transparent",
      )}
      disabled={pending}
      type="button"
    >
      {pending ? (
        <LoadingDots color="#808080" />
      ) : (
        <div className="flex items-center justify-center gap-1">
          <Trash width={16} /> Excluir
        </div>
      )}
    </button>
  );
}
