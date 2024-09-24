"use client";

import Icon from "@/components/global/icon";
import LoadingDots from "@/components/icons/loading-dots";
import { resendPostAI } from "@/lib/actions/posts";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function ResendPostAIButton({
  postId,
  template,
}: {
  postId: string;
  template: string;
}) {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await resendPostAI(postId);
          va.track("Resend Product AI");
          toast.success("Aguarde a execução da IA!");
          router.push(
            `/site/${id}/contents/posts/${
              template === "empty" ? "" : template
            }?updated=${postId}`,
          );
        })
      }
      className={cn(
        "flex h-8 w-8 items-center justify-center space-x-2 rounded-full border text-sm transition-all focus:outline-none ",
        isPending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border bg-white text-white hover:bg-white  active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={isPending}
    >
      {isPending ? (
        <LoadingDots color="#808080" />
      ) : (
        <Icon icon="WandSparkles" className="text-stone-600" />
      )}
    </button>
  );
}
