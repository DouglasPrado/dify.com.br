"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { updateLaunchMetadata } from "@/lib/actions/launch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Launch } from "@prisma/client";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  startAt: z.date({
    required_error: "Data de inicio é obrigatório",
  }),
});

export function CalendarForm({
  data,
  buttonName = "Concluir agendamento",
}: {
  data: Launch;
  buttonName?: string;
}) {
  const router = useRouter();
  const [period, setPeriod] = useState<number>(+data.period || 30);
  const [quantity, setQuantity] = useState<number>(+data.quantity || 30);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startAt: data.startAt,
    },
  });

  async function onSubmit(dataForm: any) {
    setLoading(true);
    let formData = new FormData();
    formData.append("startAt", dataForm.startAt);
    formData.append("period", period.toString());
    formData.append("quantity", quantity.toString());
    await updateLaunchMetadata(formData, data.id, "multi");
    router.push(`/launch/${data.id}/details`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-8 "
      >
        <FormField
          control={form.control}
          name="startAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Inicio de campanha</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      type="button"
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        "w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecionar inicio</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date <= new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Informe o inicio da campanha, deverá ser a partir de hoje.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-start gap-32">
          <FormItem>
            <FormLabel>Quantos dias essa campanha ficará ativa?</FormLabel>
            <FormControl className="flex flex-row items-center gap-12">
              <div className="flex flex-row items-center gap-6">
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => {
                    period > 1 && setPeriod(period - 1);
                  }}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="text-7xl font-bold tracking-tighter">
                  {period}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => {
                    period <= 120 && setPeriod(period + 1);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            </FormControl>
            <FormDescription>
              Max. 120 dias para não prejudicar a performance.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Quantos artigos será desenvolvido no período?</FormLabel>
            <FormControl className="flex flex-row items-center gap-12">
              <div className="flex flex-row items-center gap-6">
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => {
                    quantity > 1 && setQuantity(quantity - 1);
                  }}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="text-7xl font-bold tracking-tighter">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => {
                    quantity <= 120 && setQuantity(quantity + 1);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            </FormControl>
            <FormDescription>
              Max. 2 postagens por dia, ( não spam )
            </FormDescription>
            <FormMessage />
          </FormItem>
        </div>
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
        "flex h-12 items-center justify-center space-x-2 rounded-md border px-6 text-sm transition-all focus:outline-none sm:h-10",
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
