"use client";
import Icon from "@/components/global/icon";
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
import { createCompetition } from "@/lib/actions/competition";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, ReactElement, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormCompetitionProps = {
  siteId: string;
};

const FormSchema = z.object({
  url: z.string().url("URL deve ser válida"),
});

const FormCompetition: FC<FormCompetitionProps> = ({
  siteId,
}: FormCompetitionProps): ReactElement => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      await createCompetition(siteId, data.url, "competition");
      toast.success("Adicionamos um novo concorrênte.");
      form.reset();
      router.refresh();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link do site</FormLabel>
              <FormControl>
                <div className="flex items-center gap-3">
                  <div className="absolute p-2">
                    <Icon icon="Fingerprint" size="22" />
                  </div>
                  <Input
                    placeholder="Inclua a URL do seu concorrente"
                    {...field}
                    className="pl-10"
                  />
                  <FormButton isPending={isPending} />
                </div>
              </FormControl>
              <FormDescription>
                Adicione a URL do site do seu concorrênte
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default FormCompetition;

function FormButton({ isPending }: { isPending: any }) {
  return (
    <button
      type="submit"
      className={cn(
        "flex h-10 w-36 items-center justify-center space-x-2 rounded border text-sm transition-all focus:outline-none sm:h-9",
        isPending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={isPending}
    >
      {isPending ? (
        <LoadingDots color="#808080" />
      ) : (
        <p className="font-semibold">Enviar link</p>
      )}
    </button>
  );
}
