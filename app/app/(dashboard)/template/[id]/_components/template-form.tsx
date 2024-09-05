"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import LoadingDots from "@/components/icons/loading-dots";
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
import { updateTemplate } from "@/lib/actions/template";
import { cn } from "@/lib/utils";
import { Template } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Palavras chave é obrigatório.",
  }),
});

export function TemplateForm({ data }: { data: Template }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data.name || "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      await updateTemplate({
        id,
        name: data.name,
      });
      toast.success("Template atualizado com sucesso!");
      router.refresh();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex w-full items-center gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do template</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do template" {...field} />
                </FormControl>
                <FormDescription>
                  Crie um nome para o template para adicionar aos produtos
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <SaveTemplateFormButton isPending={isPending} />
        </div>
      </form>
    </Form>
  );
}

function SaveTemplateFormButton({ isPending }: any) {
  return (
    <button
      className={cn(
        "flex h-10 w-full max-w-[120px] items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
        isPending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={isPending}
    >
      {isPending ? <LoadingDots color="#808080" /> : <p>Salvar</p>}
    </button>
  );
}
