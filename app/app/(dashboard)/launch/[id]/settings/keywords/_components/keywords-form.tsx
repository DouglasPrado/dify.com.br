"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateLaunch } from "@/lib/actions/launch";
import { Launch } from "@prisma/client";
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

export function KeywordsForm({ launch }: { launch: Launch }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keywordMain: launch.keywordMain || "",
      keywords: launch.keywords || "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      await updateLaunch({ id: launch.id, ...data });
      toast.success("Atualização feita com sucesso!");
      router.back();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="keywordMain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Palavra principal para ser ranqueada</FormLabel>
              <FormControl>
                <Input placeholder="Palavras chave" {...field} />
              </FormControl>
              <FormDescription>
                Adicione a palavra mais relevante do seu conteúdo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adicione palavras para suporte</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Adicione palavras pesquisadas separadas por linha."
                  {...field}
                  value={field.value ?? ""}
                  className="bg-white"
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
        <NextStepButton isPending={isPending} />
      </form>
    </Form>
  );
}
