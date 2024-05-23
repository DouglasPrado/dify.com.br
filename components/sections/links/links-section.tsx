"use client";
import { ProductLink } from "@/app/app/(dashboard)/site/[id]/sales/products/_components/product-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  data: any;
}

export default function LinksSection({ data }: HeroSectionProps) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col justify-around px-3 pt-6 lg:px-0">
      <div className="flex max-w-7xl flex-col items-center justify-center gap-6">
        {data.type === "products" && (
          <Accordion
            type="single"
            collapsible={true}
            className="w-full rounded-3xl bg-stone-100 px-6 shadow-xl dark:bg-stone-800"
          >
            <AccordionItem value={data.id} className="w-full border-0 ">
              <AccordionTrigger className="text-light text-sm text-stone-700 dark:text-white ">
                {data.name}
              </AccordionTrigger>

              <AccordionContent className="w-full">
                <ProductLink products={data.products} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        {data.type === "posts" && (
          <Accordion
            type="single"
            collapsible={true}
            className="w-full rounded-3xl bg-stone-100 px-6 shadow-xl dark:bg-stone-800"
          >
            <AccordionItem value={data.id} className="w-full border-0 ">
              <AccordionTrigger className="text-light text-sm text-stone-700 dark:text-white ">
                {data.name}
              </AccordionTrigger>

              <AccordionContent className="w-full">
                <ProductLink products={data.posts} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        {data.type === "buttons" && (
          <Link
            href={data.slug}
            target="_blank"
            className="text-light flex w-full items-center justify-between rounded-3xl bg-stone-100 px-6 py-4 text-sm text-stone-700 shadow-xl hover:underline dark:bg-stone-800 dark:text-white"
          >
            {data.name}
            <ExternalLink size={18} />
          </Link>
        )}
      </div>
    </section>
  );
}
