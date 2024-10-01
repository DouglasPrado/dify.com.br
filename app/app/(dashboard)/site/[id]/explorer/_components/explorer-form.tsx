"use client";

import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookOpen,
  Combine,
  LayoutList,
  Newspaper,
  ScanBarcode,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  keywords: z.string().min(2, {
    message: "Palavras chave é obrigatório.",
  }),
  outlines: z.string().min(2, {
    message: "Os tópicos são obrigatórios.",
  }),
  limitWords: z.number().min(500),
  linksInternals: z.boolean(),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function ExplorerForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keywords: "",
      outlines: "",
      limitWords: 700,
      linksInternals: true,
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      // await updatePost({ id: post.id, ...data });
      toast.success("Atualização feita com sucesso!");
      // router.push(`/post/${post.id}`);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <Select defaultValue={"empty"}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Template" className="flex" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="empty">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4" />
                Em branco
              </div>
            </SelectItem>
            <SelectItem value="list">
              <div className="flex items-center gap-3">
                <LayoutList className="h-4 w-4" />
                Lista
              </div>
            </SelectItem>
            <SelectItem value="compare">
              <div className="flex items-center gap-3">
                <Combine className="h-4 w-4" /> Comparação
              </div>
            </SelectItem>
            <SelectItem value="product">
              <div className="flex items-center gap-3">
                <ScanBarcode className="h-4 w-4" /> Review
              </div>
            </SelectItem>
            <SelectItem value="news" className="flex items-center">
              <div className="flex items-center gap-3">
                <Newspaper className="h-4 w-4" /> Notícias
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
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
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">
                  Publicar em redes sociais
                </FormLabel>
                <FormDescription>
                  Faça publicações nas suas redes sociais.
                </FormDescription>
              </div>
              <div className="flex gap-6">
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <NextStepButton isPending={isPending} /> */}
      </form>
    </Form>
  );
}

const items = [
  {
    id: "facebook",
    label: "Facebook",
  },
  {
    id: "instagram",
    label: "Instagram",
  },
  {
    id: "linkedin",
    label: "Linkedin",
  },
] as const;
