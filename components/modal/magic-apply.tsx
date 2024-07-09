"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { generateMagic } from "@/lib/actions/magics";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { Sparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useModal } from "./provider";

export default function MagicApplyModal() {
  const router = useRouter();
  const modal = useModal();
  const { id } = useParams() as { id: string };
  const [data, setData] = useState({
    name: "",
    subdomain: "",
    description: "",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      subdomain: prev.name
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, "-"),
    }));
  }, [data.name]);

  return (
    <form
      action={async (data: FormData) => {
        generateMagic(data, id).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track("Created Site");
            const { id } = res;
            console.log(res);
            router.refresh();
            modal?.hide();
            toast.success(`Successfully created site!`);
          }
        });
      }}
      className="w-full rounded-md bg-white md:max-w-md md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700"
    >
      <div className="relative flex flex-col space-y-4 p-5">
        <div className="flex items-center gap-2">
          <Sparkles width={32} className="text-stone-800" />
          <h1 className="font-title text-xl text-stone-800">Magic Tools</h1>
        </div>
        <p className="text-sm font-light text-stone-500">
          Potencialize o seu conteúdo para agilizar a produção de conteúdo.
        </p>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-stone-500"
          >
            Faça a contextualização para o conteúdo
          </label>
          <textarea
            name="description"
            placeholder="Personaliza a contextualização para produzir seu conteúdo. Max: 140 caracteres."
            value={"data.description"}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            maxLength={140}
            rows={6}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black  focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
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
      {pending ? <LoadingDots color="#808080" /> : <p>Gerar conteúdo</p>}
    </button>
  );
}
