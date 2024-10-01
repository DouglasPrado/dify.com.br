"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { createPostAutomaticAI } from "@/lib/actions/posts";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useModal } from "../../../../../../../components/modal/provider";
import { ExplorerForm } from "./explorer-form";

export default function CreateExplorerModal({ type }: { type: string }) {
  const { id } = useParams() as { id: string };
  const modal = useModal();
  const router = useRouter();

  const [data, setData] = useState({
    keyword: "",
    scheduleAt: "",
    data: "",
    type,
    status: "waiting",
  });

  return (
    <form
      action={async (data: FormData) =>
        createPostAutomaticAI(data, id, null).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track(`Created Planning to product ${id}`);
            router.refresh();
            modal?.hide();
            toast.success(`Successfully created queue!`);
          }
        })
      }
      className="flex w-full flex-col gap-4 rounded-2xl bg-white p-6 shadow md:max-w-3xl dark:bg-black dark:md:border-stone-700"
    >
      <div className="">
        <h2 className="text-start font-cal text-xl text-stone-700 dark:text-white">
          Gerar o conteúdo automatizado.
        </h2>
      </div>
      <div className="relative flex flex-col">
        <ExplorerForm />
      </div>
      <div className="flex items-center justify-end">
        <CreateClusterFormButton />
      </div>
    </form>
  );
}
function CreateClusterFormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={pending}
    >
      {pending ? (
        <LoadingDots color="#808080" />
      ) : (
        <p>Criar conteúdo automático</p>
      )}
    </button>
  );
}
