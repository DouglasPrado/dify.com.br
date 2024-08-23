"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { Input } from "@/components/ui/input";
import { updatePostMetadata } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Textarea } from "@tremor/react";
import { Text } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useModal } from "../provider";

export default function ReferenceOutlinesApplyModal({
  siteId,
}: {
  siteId: string;
}) {
  const router = useRouter();
  const modal = useModal();
  const [value, setValue] = useState("");
  const { id } = useParams() as { id: string };
  return (
    <form
      action={async (data: FormData) => {
        if (value) {
          data.append("outlines", value);
        }
        updatePostMetadata(data, id, "outlines").then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            router.refresh();
            modal?.hide();
            toast.success(`Successfully created reference!`);
          }
        });
      }}
      className="w-full rounded-md bg-white md:max-w-5xl md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700"
    >
      <div className="relative flex flex-col space-y-4 p-5">
        <div className="flex items-center gap-2">
          <Text width={32} className="text-stone-800" />
          <h1 className="font-title text-xl text-stone-800">
            Desenvolva a estrutura do conteúdo.
          </h1>
        </div>
        <p className="text-sm font-light text-stone-500">
          Padronize a produção do seu conteúdo de forma estruturada.
        </p>
        <Input name="postId" value={id} type="hidden" />
        <Input name="type" value="url" type="hidden" />
        <div className="max-h-96 space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-normal text-stone-700"
          >
            Faça a contextualização para o conteúdo
          </label>
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Adicione as outlines do conteúdo"
          />
        </div>
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-5 dark:border-stone-700 dark:bg-stone-800">
        <ApplyMagicFormButton />
      </div>
    </form>
  );
}
function ApplyMagicFormButton() {
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
      {pending ? <LoadingDots color="#808080" /> : <p>Gerar referência</p>}
    </button>
  );
}
