"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  addPostToFromRelationshipId,
  removePostToFromRelationshipId,
} from "@/lib/actions/posts";
import { cn } from "@/lib/utils";
import { Collection, Post } from "@prisma/client";
import va from "@vercel/analytics";
import { Check, Loader, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

type AddPostRelationshipProps = {
  relatedId: string;
  data: (Post & { collections: Collection[] }) | any;
};

export default function AddPostCollectionButton({
  relatedId,
  data,
}: AddPostRelationshipProps) {
  const { id } = useParams() as { id: string };
  const [isPending, startTransition] = useTransition();
  const [hasRelationship, setHasRelationship] = useState(false);
  const router = useRouter();
  useEffect(() => {
    data?.relatedPosts?.map((relationship: any) => {
      if (relationship.relatedPostId === relatedId) {
        setHasRelationship(true);
      }
    });
  }, [data, relatedId]);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            onClick={() =>
              startTransition(async () => {
                !hasRelationship
                  ? await addPostToFromRelationshipId(id, relatedId)
                  : await removePostToFromRelationshipId(id, relatedId);
                va.track(
                  !hasRelationship
                    ? "Add Post From Relationship"
                    : "Remove Post From Relationship",
                );
                toast.success(
                  !hasRelationship
                    ? `Post adicionado com sucesso.`
                    : `Post removido com sucesso.`,
                );
                !isPending && setHasRelationship(!hasRelationship);
                router.refresh();
              })
            }
            type="button"
            className={cn(
              "flex h-[40px] w-[40px] items-center rounded-full p-2",
              !isPending && hasRelationship
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
            ) : hasRelationship ? (
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
          <span>Add a relacionamento</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
