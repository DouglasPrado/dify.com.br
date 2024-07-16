"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { addCategoryToFromCollectionId, removeCategoryToFromCollectionId } from "@/lib/actions/category";
import { cn } from "@/lib/utils";
import { Collection, Post } from "@prisma/client";
import va from "@vercel/analytics";
import { Check, Loader, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

type AddPostCollectionProps = {
  data: (Post & { collections: Collection[] }) | any;
  collectionId: string;
};

export default function AddPostCollectionButton({
  data,
  collectionId,
}: AddPostCollectionProps) {
  const { id } = useParams() as { id: string };
  const [isPending, startTransition] = useTransition();
  const [hasCollection, setHasCollection] = useState(false);
  const router = useRouter();
  useEffect(() => {
    data?.collections?.map((collection: any) => {
      if (collection.id === collectionId) {
        setHasCollection(true);
      }
    });
  }, [data, collectionId]);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            onClick={() =>
              startTransition(async () => {
                !hasCollection
                  ? await addCategoryToFromCollectionId(collectionId, id)
                  : await removeCategoryToFromCollectionId(collectionId, id);
                va.track(
                  !hasCollection
                    ? "Add Category From Collection"
                    : "Remove Category From Collection",
                );
                toast.success(
                  !hasCollection
                    ? `Coleção adicionado com sucesso.`
                    : `Coleção removido com sucesso.`,
                );
                !isPending && setHasCollection(!hasCollection);
                router.refresh();
              })
            }
            type="button"
            className={cn(
              "flex h-[40px] w-[40px] items-center rounded-full p-2",
              !isPending && hasCollection
                ? "border border-emerald-200 !bg-emerald-100"
                : "border hover:bg-stone-100",
            )}
            disabled={isPending}
          >
            {isPending ? (
              <Loader
                width={32}
                className="animate-spin text-stone-600 hover:text-stone-400"
              />
            ) : hasCollection ? (
              <Check width={32} className={cn("text-green-600")} />
            ) : (
              <Plus
                width={32}
                className={cn("text-stone-600 hover:text-stone-400")}
              />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <span>Add coleção</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
