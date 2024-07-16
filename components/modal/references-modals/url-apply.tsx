"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { Input } from "@/components/ui/input";
import { generateReferenceURL } from "@/lib/actions/reference";
import { cn } from "@/lib/utils";
import { Link2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";
import { useModal } from "../provider";

export default function ReferenceURLApplyModal({ siteId }: { siteId: string }) {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [value, setValue] = useState("https://www.tabnews.com.br/");
  const modal = useModal();
  return (
    <form
      action={async (data: FormData) => {
        data.append("url", value);
        generateReferenceURL(data, id).then((res) => {
          router.refresh();
          modal?.hide();
          toast.success(`Successfully created reference!`);
        });
      }}
      className="w-full rounded-md bg-white md:max-w-5xl md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700"
    >
      <div className="relative flex flex-col space-y-4 p-5">
        <div className="flex items-center gap-2">
          <Link2 width={32} className="text-stone-800" />
          <h1 className="font-title text-xl text-stone-800">
            Referência com Link/URL
          </h1>
        </div>
        <p className="text-sm font-light text-stone-500">
          Potencialize o seu conteúdo para agilizar a produção de conteúdo.
        </p>
        <Input name="postId" value={id} type="hidden" />
        <Input name="type" value="url" type="hidden" />
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-normal text-stone-700"
          >
            Faça a contextualização para o conteúdo
          </label>

          <Input
            name="reference"
            placeholder="Digite a link: https://g1.com/postagem-01"
            onChange={(e) => setValue(e.target.value)}
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
