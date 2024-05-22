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
import { Keywords } from "@/components/ui/keywords";
import { Textarea } from "@/components/ui/textarea";
import { updateLaunchMetadata } from "@/lib/actions/launch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Launch } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  subject: z
    .string({
      required_error: "O assunto é um campo obrigatório",
    })
    .min(2, {
      message: "O assunto deverá ter no mínimo 2 caracteres.",
    }),
  description: z.string({
    required_error: "Descrição é obrigatório",
  }),
  keywords: z
    .string({
      required_error: "As palavras-chave são obrigórias",
    })
    .array(),
});

export function CampaignForm({
  data,
  buttonName = "Próxima etapa",
}: {
  data: Launch;
  buttonName?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subject: (data.subject as string) || "",
      description: (data.description as string) || "",
      keywords: data?.keywords ? [...data?.keywords?.split(",")] : [],
    },
  });

  async function onSubmit(dataForm: any) {
    setLoading(true);
    let formData = new FormData();
    formData.append("subject", dataForm.subject);
    formData.append("description", dataForm.description);
    formData.append("keywords", dataForm.keywords);
    await updateLaunchMetadata(formData, data.id, "multi");
    router.push(`/launch/${data.id}/create/calendar`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-3 "
      >
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assunto</FormLabel>
              <FormControl>
                <Input placeholder="Digite o Assunto" {...field} />
              </FormControl>
              <FormDescription>
                Assunto sobre sua campanha, abordagem principal. Max. 75
                caracteres.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                Descreva o que você irá abordar na sua campanha.
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
              <FormLabel>Palavras-chave</FormLabel>
              <FormControl>
                <Keywords {...field} />
              </FormControl>
              <FormDescription>
                Descreva o que você irá abordar na sua campanha.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
