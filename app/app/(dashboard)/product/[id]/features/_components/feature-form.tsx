"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateProductFeatures } from "@/lib/actions/product-features";
import { Product, ProductFeature } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function FeatureForm({
  product,
}: {
  product: Product & { features: ProductFeature[] };
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const createSchema = product.features.map((feature) => ({
    [feature.id]: z.string().optional(),
  }));

  const createSchemaObject = createSchema.reduce((acc, curr) => {
    return { ...acc, ...curr };
  }, {});

  const FormSchema = z.object(createSchemaObject);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: product.features.reduce((acc: any, feature: any) => {
      acc[feature.id] = feature.value;
      return acc;
    }, {}),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      console.log(data);
      await updateProductFeatures(data);
      toast.success("Atualização feita com sucesso!");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {product.features.map((feature, idx) => (
          <FormField
            key={`key-review-item-${idx}`}
            control={form.control}
            name={feature.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{feature.name}</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-1">
                    <Input placeholder={"Digite o valor"} {...field} />
                  </div>
                </FormControl>
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
