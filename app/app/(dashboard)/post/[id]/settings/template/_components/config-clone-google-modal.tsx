"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "@/components/modal/provider";
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
import { cloneProductFromGoogle } from "@/lib/actions/product";
import { SerpProduct } from "@/lib/serper";
import { useSiteStore } from "@/lib/stores/SiteStore";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bolt } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ConfigCloneGoogleModal({
  product,
}: {
  product: SerpProduct;
}) {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const modal = useModal();
  const [isPending, startTransition] = useTransition();
  const [siteId] = useSiteStore((state) => [state.siteId]);
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const cloned: any =
      siteId && (await cloneProductFromGoogle(siteId, product));
    cloned.error
      ? toast.error(`${cloned.error}`)
      : toast.success(`Produto clonado com sucesso!`);
    router.refresh();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full rounded-md bg-white md:max-w-md md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700"
      >
        <div className="relative flex flex-col space-y-4 p-5 md:p-10">
          <h2 className="flex items-center gap-1 font-title text-2xl dark:text-white">
            <Bolt size={22} /> Configurações de produto
          </h2>

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selecione o template</FormLabel>
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
          <CreateItemFormButton isPending={isPending} />
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
