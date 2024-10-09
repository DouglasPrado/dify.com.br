"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import UploaderFile from "@/components/form/uploader-file";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { updateLaunch } from "@/lib/actions/launch";
import { Keywords } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import NextStepButton from "./next-step-button";

const FormSchema = z.object({
  keywordMain: z.string().min(2, {
    message: "Palavras chave é obrigatório.",
  }),
  keywords: z.string().min(2, {
    message: "As palavras de suporte são obrigatórios.",
  }),
});

export function KeywordsForm({
  siteId,
  keywords,
}: {
  siteId: string;
  keywords: Keywords;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      await updateLaunch({ id: siteId, ...data });
      toast.success("Atualização feita com sucesso!");
      router.back();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <div className="flex flex-col">
          <div className="flex flex-col space-y-2 ">
            <span className="text-sm font-semibold text-stone-700">
              Palavras-chave por arquivo
            </span>
            <UploaderFile name="file" />
            <span className="text-xs font-light text-stone-700">
              Suba arquivo com a lista de palavras, máximo 2.000 palavras, cada
              palavra será um artigo.
            </span>
          </div>
          <div className="relative my-4 flex items-center justify-center border-b">
            <span className="absolute -top-3 bg-white px-3 text-sm font-light text-stone-500">
              ou
            </span>
          </div>

          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Palavras-chave por texto</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Adicione palavras pesquisadas separadas por linha."
                    {...field}
                    value={field.value ?? ""}
                    rows={5}
                    className="bg-white hover:bg-stone-50/75"
                  />
                </FormControl>
                <FormDescription>
                  Adicione palavras secundárias para dar apoio ao seu conteúdo
                  principal.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className="py-2 text-xs font-light text-stone-700">
            Cola as palavras separadas por linha. Máximo 2.000 palavras, cada
            palavra será um artigo.
          </span>
        </div>

        <NextStepButton isPending={isPending} />
      </form>
    </Form>
  );
}
