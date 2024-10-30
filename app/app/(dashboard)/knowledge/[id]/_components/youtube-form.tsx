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
import { useKnowledgeStore } from "@/lib/stores/KnowledgeStore";
import { useSiteStore } from "@/lib/stores/SiteStore";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, ReactElement, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type YoutubeFormProps = {
  knowledgeId: string;
};
const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

const FormSchema = z.object({
  url: z
    .string()
    .url("URL deve ser válida")
    .refine(
      (url) => {
        return youtubeUrlRegex.test(url);
      },
      {
        message: "URL deve ser um link válido do YouTube",
      },
    ),
});

const YoutubeForm: FC<YoutubeFormProps> = ({
  knowledgeId,
}: YoutubeFormProps): ReactElement => {
  const [addKnowledge] = useKnowledgeStore((state) => [state.addKnowledge]);
  const [siteId] = useSiteStore((state) => [state.siteId]);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    siteId &&
      startTransition(async () => {
        const formData = new FormData();
        if (data.url.indexOf("https://") === 0) {
          formData.append("code", data.url.split("v=")[1]);
        } else {
          formData.append("code", data.url);
        }
        formData.append("siteId", siteId);
        addKnowledge(formData, knowledgeId, "knowledge");
        form.reset();
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
              <FormLabel>Link do youtube</FormLabel>
              <FormControl>
                <div className="flex items-center gap-3">
                  <div className="absolute p-2">
                    <Icon icon="Youtube" size="22" />
                  </div>
                  <Input
                    placeholder="Link do youtube"
                    {...field}
                    className="pl-10"
                  />
                  <FormButton isPending={isPending} />
                </div>
              </FormControl>
              <FormDescription>Adicione a URL do youtube</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default YoutubeForm;

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
