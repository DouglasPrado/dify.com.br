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
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { updatePost } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import NextStepButton from "./next-step-button";

const FormSchema = z.object({
  keywords: z.string().min(2, {
    message: "Palavras chave é obrigatório.",
  }),
  outlines: z.string().min(2, {
    message: "Os tópicos são obrigatórios.",
  }),
  limitWords: z.number().min(500),
  linksInternals: z.boolean(),
});

export function SEOForm({ post }: { post: Post }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keywords: post.keywords || "",
      outlines: post.outlines || "",
      limitWords: Number(post.limitWords) || 700,
      linksInternals: true,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      await updatePost({ id: post.id, ...data });
      toast.success("Atualização feita com sucesso!");
      router.push(`/post/${post.id}`);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Palavras chave</FormLabel>
              <FormControl>
                <Input placeholder="Palavras chave" {...field} />
              </FormControl>
              <FormDescription>
                Adicione palavras chave para enriquecer o conteúdo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="outlines"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adicione os tópicos do conteúdo</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Adicione os tópicos do seu conteúdo, apenas h2 e h3"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                Adicione palavras chave para enriquecer o conteúdo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linksInternals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Links internos</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="linksInternals"
                    checked={field.value} // Usa o valor atual do campo
                    onCheckedChange={field.onChange} // Atualiza o valor do campo quando o switch muda
                  />
                  <Label htmlFor="linksInternals">
                    Links internos automáticamente
                  </Label>
                </div>
              </FormControl>
              <FormDescription>
                Adicione palavras chave para enriquecer o conteúdo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="limitWords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Limite de palavras</FormLabel>
              <FormControl>
                <div className="flex items-center gap-1">
                  <Slider
                    value={[field.value || 700]} // Inicializa o slider com o valor do campo ou um valor padrão
                    max={2500}
                    min={500}
                    step={10}
                    onValueChange={(value) => field.onChange(value[0])} // Atualiza o campo com o valor do slider
                    className={cn("w-[100%]")}
                  />
                  <span className="text-sm font-light text-stone-700">
                    {field.value}
                  </span>
                </div>
              </FormControl>
              <FormDescription>
                Adicione palavras chave para enriquecer o conteúdo.
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
