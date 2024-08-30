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
import { Textarea } from "@/components/ui/textarea";
import { useKnowledgeStore } from "@/lib/stores/KnowledgeStore";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, ReactElement, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type TextFormProps = {
  postId: string;
};

const FormSchema = z.object({
  title: z.string().min(3, {
    message: "O texto deverá ter mais de 3 caracteres.",
  }),
  content: z.string().min(100, {
    message: "O texto deverá ter mais de 100 caracteres.",
  }),
  postId: z.string(),
  type: z.string(),
});

const TextForm: FC<TextFormProps> = ({
  postId,
}: TextFormProps): ReactElement => {
  const [isPending, startTransition] = useTransition();
  const [addKnowledge] = useKnowledgeStore((state) => [state.addKnowledge]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
      postId,
      type: "text",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("postId", data.postId);
      formData.append("type", data.type);
      addKnowledge(formData, postId);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adicione título para o documento</FormLabel>
              <FormControl>
                <div className="flex items-center gap-3">
                  <div className="absolute p-2">
                    <Icon icon="Text" size="22" />
                  </div>
                  <Input
                    className="pl-10"
                    placeholder="Adicione título..."
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adicione somente texto</FormLabel>
              <FormControl>
                <div className="relative flex items-center gap-3">
                  <div className="absolute top-1 p-2">
                    <Icon icon="Text" size="22" />
                  </div>
                  <Textarea
                    className="pl-10"
                    placeholder="Adicione qualquer texto para conhecimento"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Adicione textos para complementar o conhecimento
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButton isPending={isPending} />
      </form>
    </Form>
  );
};

export default TextForm;

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
        <p className="font-semibold">Salvar texto</p>
      )}
    </button>
  );
}
