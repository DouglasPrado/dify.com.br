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
import { updateProductSources } from "@/lib/actions/product-sources";
import { Product, ProductSources } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function SourcesForm({
  product,
}: {
  product: Product & { sources: ProductSources[] };
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const createSchema = SOURCES.map((source) => ({
    [source.source]: z.string().optional(),
  }));

  const createSchemaObject = createSchema.reduce((acc, curr) => {
    return { ...acc, ...curr };
  }, {});

  const FormSchema = z.object(createSchemaObject);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: product.sources.reduce((acc: any, feature: any) => {
      acc[feature.source] = feature.url;
      return acc;
    }, {}),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      await updateProductSources({ data, productId: product.id });
      toast.success("Atualização feita com sucesso!");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {SOURCES.map((source, idx) => (
          <FormField
            key={`key-source-item-${idx}`}
            control={form.control}
            name={source.source}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Image
                    src={source.icon}
                    width={48}
                    height={48}
                    alt={`[${source.source}]`}
                  />
                  <span>{source.source}</span>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-1">
                    <Input
                      placeholder={"Digite o link de afiliados..."}
                      {...field}
                    />
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

const SOURCES = [
  {
    source: "Amazon",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    source: "Mercado Livre",
    icon: "https://logopng.com.br/logos/mercado-livre-88.png",
  },
  {
    source: "Shopee",
    icon: "https://i.pinimg.com/originals/05/7b/27/057b274c134bcf92ac151758478949b3.png",
  },
  {
    source: "Aliexpress",
    icon: "https://cdn.icon-icons.com/icons2/2699/PNG/512/aliexpress_logo_icon_168669.png",
  },
];
