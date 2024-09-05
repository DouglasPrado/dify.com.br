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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addItemFeature } from "@/lib/actions/template";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import {  useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useModal } from "../../../../../../components/modal/provider";

export default function CreateItemFeatureModal() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const modal = useModal();
  const [isPending, startTransition] = useTransition();

  const FormSchema = z.object({
    name: z.string({
      required_error: "Crie uma descrição.",
    }),
    type: z.enum(["boolean", "checklist", "text"], {
      required_error: "Boleano ou text.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      await addItemFeature({
        templateId: id,
        name: data.name,
        type: data.type,
      });
      toast.success("Item adicionado com sucesso!");
      modal?.hide();
      router.refresh();
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full rounded-md bg-white md:max-w-md md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700"
      >
        <div className="relative flex flex-col space-y-4 p-5 md:p-10">
          <h2 className="font-title text-2xl dark:text-white">
            Crie especificação
          </h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Descrição da especificação" {...field} />
                </FormControl>
                <FormDescription>
                  Crie a descrição da especificação ex: Peso
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo do valor</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="text">Texto</SelectItem>
                    <SelectItem value="boolean">Boleano</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Tipo de exibição da especificação
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 md:px-10 dark:border-stone-700 dark:bg-stone-800">
          <CreateItemFormButton isPending={isPending}/>
        </div>
      </form>
    </Form>
  );
}
function CreateItemFormButton({ isPending }: any) {
  return (
    <button
      className={cn(
        "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
        isPending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={isPending}
    >
      {isPending ? <LoadingDots color="#808080" /> : <p>Criar especificação</p>}
    </button>
  );
}
