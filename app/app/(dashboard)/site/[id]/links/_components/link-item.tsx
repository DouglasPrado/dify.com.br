"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRaisedShadow } from "@/lib/hooks/use-raised-shadow";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { GripVertical, SquarePen } from "lucide-react";
import Link from "next/link";
import { ProductLink } from "../../sales/products/_components/product-link";

export default function LinkItem({ value }: { value: any }) {
  const controls = useDragControls();
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  console.log(value);
  return (
    <Reorder.Item
      value={value}
      id={value.id}
      style={{ boxShadow, y }}
      dragControls={controls}
      dragListener={false}
    >
      <Accordion
        type="single"
        collapsible
        className="my-3 w-full rounded-xl border bg-stone-100 px-6"
      >
        <AccordionItem value={value.id} className="w-full border-0">
          <AccordionTrigger className="text-light text-sm text-black ">
            <div className="flex w-full items-center gap-4">
              <div className="flex w-full items-center justify-start">
                <div
                  className="reorder-handle mr-3 cursor-grab"
                  onPointerDown={(e) => {
                    controls.start(e);
                  }}
                >
                  <GripVertical size={18} />
                </div>
                <h1 className="font-title">{value.name}</h1>
              </div>
              <div>
                <span className="flex items-center rounded-full bg-stone-200 px-4 py-1 font-title text-xs no-underline">
                  {value.type}
                </span>
              </div>
              <Link
                href={`/collection/${value.id}/${value.type}`}
                className="mr-3 rounded-full p-2 hover:bg-stone-200"
              >
                <SquarePen size={18} />
              </Link>
            </div>
          </AccordionTrigger>

          {value.type === "products" && (
            <AccordionContent className="w-full">
              <ProductLink products={value.products} />
            </AccordionContent>
          )}
          {value.type === "posts" && (
            <AccordionContent className="w-full">
              <ProductLink products={value.posts} />
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>
    </Reorder.Item>
  );
}
