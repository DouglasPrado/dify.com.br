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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettingsPostStore } from "@/lib/stores/SettingsPostStore";
import { useSiteStore } from "@/lib/stores/SiteStore";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bolt } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";

export default function CreateProductModal({ type }: { type: string }) {
  const [siteId] = useSiteStore((state) => [state.siteId]);
  const [templates, getTemplates] = useSettingsPostStore((state) => [
    state.templates,
    state.getTemplates,
  ]);

  const FormSchema = z.object({
    template: z.string({
      required_error: "Selecione um template",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  console.log(form.formState.errors);

  useEffect(() => {
    if (siteId && templates.length === 0) {
      getTemplates(siteId);
    }
  });

  const [data, setData] = useState({
    name: "",
    link: "",
    template: "",
  });

  const onSubmit = (formData: any) => {
    const template = formData.template;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full rounded-md bg-white md:max-w-xl md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700"
      >
        <div className="border-b bg-stone-50 p-4">
          <h2 className="flex items-center gap-1 font-title text-2xl dark:text-white">
            <Bolt size={22} /> Configurações de produto
          </h2>
        </div>
        <div className="relative flex flex-col gap-3 p-5 md:p-6">
          <div className="flex flex-col space-y-2">
            <div>
              <label
                htmlFor="description"
                className="text-sm font-medium text-stone-800 dark:text-stone-400"
              >
                Nome do produto
              </label>
              <p className="text-xs font-light text-gray-600 ">
                Adicione o nome do produto desejado para realizarmos a busca.
              </p>
            </div>
            <Input
              name="name"
              type="text"
              placeholder="Digite o nome do produto"
              autoFocus
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
              className="w-full rounded-md border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div>
              <label
                htmlFor="description"
                className="text-sm font-medium text-stone-800 dark:text-stone-400"
              >
                Link de afiliado
              </label>
              <p className="text-xs font-light text-gray-600 ">
                Adicione o link de afiliados
              </p>
            </div>
            <Input
              name="link"
              type="text"
              placeholder="Digite o nome do produto"
              autoFocus
              value={data.link}
              onChange={(e) => setData({ ...data, link: e.target.value })}
              required
              className="w-full rounded-md border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
            />
          </div>
          <div className="relative flex flex-col">
            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecione o template</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o template" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {templates.map((template, idx: number) => (
                        <SelectItem
                          key={`key-template-${template.id}-${idx}`}
                          value={template.id}
                        >
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Template para comparação de produtos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <div className="flex flex-col space-y-2">
          <div className="py-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-stone-500 dark:text-stone-400"
            >
              Data de agendamento
            </label>
            <p className="text-xs font-light text-gray-600 ">
              Adicione uma data para o lançamento da postagem
            </p>
          </div>
          <input
            name="scheduleAt"
            type="date"
            autoFocus
            value={data.scheduleAt}
            onChange={(e) => setData({ ...data, scheduleAt: e.target.value })}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div> */}

          {/* <div className="flex flex-col space-y-2">
          <div className="py-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-stone-500 dark:text-stone-400"
            >
              Descrição
            </label>
            <p className="text-xs font-light text-gray-600 ">
              Crie um resumo do que a página deverá ter.
            </p>
          </div>
          <textarea
            name="data"
            autoFocus
            value={data.data}
            onChange={(e) => setData({ ...data, data: e.target.value })}
            required
            rows={10}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          ></textarea>
        </div> */}
        </div>
        <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 md:px-6 dark:border-stone-700 dark:bg-stone-800">
          <CreateClusterFormButton />
        </div>
      </form>
    </Form>
  );
}
function CreateClusterFormButton() {
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
      {pending ? <LoadingDots color="#808080" /> : <p>Criar produto</p>}
    </button>
  );
}
