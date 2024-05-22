"use client";

import LoadingDots from "@/components/icons/loading-dots";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import DOCUIMAGE from "@/public/document.svg";
import InstagramIMAGE from "@/public/instagram.svg";
import XIMAGE from "@/public/x.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { Launch } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  type: z.string(),
});

export function TypeForm({
  data,
  buttonName = "Próxima Etapa",
}: {
  data: Launch;
  buttonName?: string;
}) {
  const [type, setType] = useState("articles");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "articles",
    },
  });

  function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    router.push(`/launch/${data.id}/create/name`);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-8 "
      >
        <div className="flex items-center justify-start gap-32">
          <FormItem>
            <FormLabel></FormLabel>
            <FormControl className="flex w-full flex-row items-center gap-12">
              <div className="grid w-full grid-cols-3 items-center gap-6">
                <button
                  type="button"
                  onClick={() => setType("articles")}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-3 rounded-lg border px-6 py-2 text-slate-700  ",
                    type === "articles" &&
                      "bg-black text-white hover:bg-stone-800",
                  )}
                >
                  <Image
                    src={DOCUIMAGE}
                    alt="[LOGO ARTICLE]"
                    width={40}
                    height={40}
                  />
                  <span className="text-sm font-semibold ">Artigos</span>
                </button>

                <button
                  onClick={() => setType("instagram")}
                  type="button"
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-3 rounded-lg border px-6 py-2 text-slate-700 hover:bg-stone-50 ",
                    type === "instagram" &&
                      "bg-black text-white hover:bg-stone-800",
                  )}
                >
                  <Image
                    src={InstagramIMAGE}
                    alt="[LOGO INSTAGRAM]"
                    width={40}
                    height={40}
                  />
                  <span className="text-sm font-semibold ">Instagram</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType("twitter")}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-3 rounded-lg border px-6 py-2 text-slate-700 hover:bg-stone-50 ",
                    type === "twitter" &&
                      "bg-black text-white hover:bg-stone-800",
                  )}
                >
                  <Image src={XIMAGE} alt="[LOGO X]" width={40} height={40} />
                  <span className="text-sm font-semibold">Twitter/X</span>
                </button>
              </div>
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        </div>
        <FormButton loading={loading} name={buttonName} />
      </form>
    </Form>
  );
}

function FormButton({ loading, name }: { loading: boolean; name: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-12 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
        pending || loading
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "bg-slate-900 text-white hover:bg-white hover:text-slate-600 dark:hover:bg-transparent",
      )}
      disabled={pending || loading}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>{name}</p>}
    </button>
  );
}
