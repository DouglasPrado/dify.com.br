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
import { updateLaunchMetadata } from "@/lib/actions/launch";
import { cn } from "@/lib/utils";
import { Launch } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deverá ser no minímo 2 caracteres.",
  }),
});

export function NameForm({
  data,
  buttonName = "Próxima etapa",
}: {
  data: Launch;
  buttonName?: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: (data.name as string) || "",
    },
  });

  async function onSubmit(dataForm: any) {
    setLoading(true);
    let formData = new FormData();
    formData.append("name", dataForm.name);
    await updateLaunchMetadata(formData, data.id, "name");
    router.push(`/launch/${data.id}/create/campaign`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome" {...field} />
              </FormControl>
              <FormDescription>
                Nome de refêrencia da automação. Max. 75 caracteres.
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
