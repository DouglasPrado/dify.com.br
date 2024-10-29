"use client";

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
import { createKnowledge } from "@/lib/actions/knowledge";
import { useSiteStore } from "@/lib/stores/SiteStore";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "../ui/input";
import { useModal } from "./provider";

export default function CreateKnowledgeModal() {
  const [siteId] = useSiteStore((state) => [state.siteId]);
  const router = useRouter();
  const modal = useModal();
  const FormSchema = z.object({
    title: z.string({
      required_error: "Nome da pasta é obrigatório",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", data.title);
      siteId &&
        createKnowledge(formData, siteId, null).then((res) => {
          toast.success("Conhecimento iniciado com sucesso!");
          router.refresh();
          modal?.hide();
          router.push(`/site/${siteId}/knowledge/create/${res.id}`);
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full rounded-2xl bg-white md:max-w-xl md:shadow-xl dark:bg-black dark:md:border-stone-700"
      >
        <div className="px-4 pt-4">
          <h2 className="flex items-center gap-1 font-cal text-xl dark:text-white">
            Configurações de conhecimento
          </h2>
        </div>

        <div className="relative flex flex-col gap-3 p-4">
          <div className="flex flex-col space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da pasta</FormLabel>
                  <FormControl>
                    <Input placeholder="Adicione o nome da pasta" {...field} />
                  </FormControl>
                  <FormDescription>
                    Adicione o nome desejado para realizarmos a busca.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex items-center justify-end rounded-b-lg p-4 dark:border-stone-700 dark:bg-stone-800">
          <CreateKnowledgeFormButton />
        </div>
      </form>
    </Form>
  );
}
function CreateKnowledgeFormButton() {
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
        <p>Criar pasta para conhecimento</p>
      )}
    </button>
  );
}
