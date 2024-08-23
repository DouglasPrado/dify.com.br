"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { Input } from "@/components/ui/input";
import { generateReferenceYoutube } from "@/lib/actions/reference";
import { cn } from "@/lib/utils";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Youtube } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";
import { useModal } from "../provider";

export default function ReferenceVideoApplyModal() {
  const router = useRouter();
  const modal = useModal();
  const [value, setValue] = useState("MZAyl2RMtgI");
  const { id }: any = useParams();
  console.log(value);
  return (
    <form
      action={async (data: FormData) => {
        data.append("code", value);
        generateReferenceYoutube(data, id).then((res) => {
          router.refresh();
          modal?.hide();
          toast.success(`Successfully created reference!`);
        });
      }}
      className="w-full rounded-md bg-white md:max-w-5xl md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700"
    >
      <div className="relative flex flex-col space-y-4 p-5">
        <div className="flex items-center gap-2">
          <Youtube width={32} className="text-stone-800" />
          <h1 className="font-title text-xl text-stone-800">
            Referência com Youtube
          </h1>
        </div>
        <p className="text-sm font-light text-stone-500">
          Extraia o conteúdo do youtube para contextualizar o seu conteúdo.
        </p>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-normal text-stone-700"
          >
            Faça a contextualização para o conteúdo
          </label>
          <Input
            placeholder="Digite o código do youtube link: https://www.youtube.com/watch?v=n7GqvlLYpTo"
            onChange={(e) => {
              console.log(e.target.value.indexOf("https://") === 0);
              if (e.target.value.indexOf("https://") === 0) {
                setValue(e.target.value.split("v=")[1]);
              } else {
                setValue(e.target.value);
              }
            }}
          />

          <div className="flex h-full w-full items-center justify-center pt-3 ">
            <YouTubeEmbed
              videoid={value}
              params="version=3&autoplay=0&controls=0&showinfo=0&disablekb=0&rel=0"
              style="width: 560px; height: 315px;"
            />
          </div>
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
