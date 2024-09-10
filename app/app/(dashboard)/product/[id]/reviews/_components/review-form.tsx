"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { updateProductReviews } from "@/lib/actions/product-reviews";
import { cn } from "@/lib/utils";
import { Product, ProductReview } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function ReviewForm({
  product,
}: {
  product: Product & { reviews: ProductReview[] };
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const createSchema = product.reviews.map((review) => ({
    [review.id]: z
      .number()
      .min(1, { message: "O mínimo da pontuação deverá ser 1." })
      .max(10, { message: "O limite da pontuação deverá ser 10." }),
  }));

  const createSchemaObject = createSchema.reduce((acc, curr) => {
    return { ...acc, ...curr };
  }, {});

  const FormSchema = z.object(createSchemaObject);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: product.reviews.reduce((acc: any, review: any) => {
      acc[review.id] = review.value;
      return acc;
    }, {}),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      await updateProductReviews(product.id, data);
      toast.success("Atualização feita com sucesso!");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {product.reviews.map((review, idx) => (
          <FormField
            key={`key-review-item-${idx}`}
            control={form.control}
            name={review.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{review.name}</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-1">
                    <Slider
                      value={[field.value || review.value]} // Inicializa o slider com o valor do campo ou um valor padrão
                      max={10}
                      min={1}
                      step={1}
                      onValueChange={(value) => field.onChange(value[0])} // Atualiza o campo com o valor do slider
                      className={cn("w-[100%]")}
                    />
                    <span className="text-sm font-light text-stone-700">
                      {field.value || review.value}
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
        ))}
        <Button>Atualizar</Button>
      </form>
    </Form>
  );
}
