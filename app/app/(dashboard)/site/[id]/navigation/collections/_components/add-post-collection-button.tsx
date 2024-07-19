"use client";

import LoadingDots from "@/components/icons/loading-dots";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { addPostToFromCollectionId } from "@/lib/actions/collections";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { ListPlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type AddPostCollectionProps = {
  postId: string;
};

export default function AddPostCollectionButton({
  postId,
}: AddPostCollectionProps) {
  const { id } = useParams() as { id: string };
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            onClick={() =>
              startTransition(async () => {
                await addPostToFromCollectionId(id, postId);
                va.track("Add Post From Collection");
                toast.success(`Post adicionado com sucesso.`);
                router.refresh();
              })
            }
            type="button"
            className={cn(
              "mb-4 flex items-center justify-center space-x-2 rounded-lg border p-1 text-sm transition-all first:ml-4 focus:outline-none ",
              isPending
                ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
            )}
            disabled={isPending}
          >
            {isPending ? (
              <LoadingDots color="#808080" />
            ) : (
              <ListPlus size={20} />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <span>Add a coleção</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
