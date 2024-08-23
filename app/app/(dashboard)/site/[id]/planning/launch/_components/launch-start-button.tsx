"use client";

import { updateLaunchMetadata } from "@/lib/actions/launch";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { PlayCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function LaunchStartButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      onClick={() =>
        startTransition(async () => {
          const formData = new FormData();
          formData.append("status", "play");
          await updateLaunchMetadata(formData, id, "status");
          va.track("Start Launch");
          toast.success(`Lançamento iniciado com sucesso.`);
        })
      }
      type="button"
      className={cn(
        "flex items-center justify-center gap-3 text-xs transition-all ",
        isPending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "",
      )}
      disabled={isPending}
    >
      <PlayCircle size={24} color="black" className="mr-2 h-4 w-4" />
    </button>
  );
}
