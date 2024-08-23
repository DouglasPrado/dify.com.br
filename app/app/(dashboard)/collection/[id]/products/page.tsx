import { ProductLink } from "@/app/app/(dashboard)/site/[id]/sales/products/_components/product-link";
import BackButton from "@/components/global/back-button";
import GridContents from "@/components/global/grid-contents";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function CollectionProductsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.collection.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      posts: true,
      products: true,
      site: {
        select: {
          subdomain: true,
        },
      },
    },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }
  return (
    <div className="h-screen w-full max-w-7xl flex-col">
      <section className="flex flex-col justify-center">
        <div className="flex h-full flex-col justify-start gap-6">
          <div className="grid grid-cols-1 items-center justify-start gap-6 lg:flex lg:flex-row">
            <BackButton>Voltar</BackButton>
            <div className="flex flex-col">
              <h1 className="font-title text-2xl">Adicione produtos</h1>
              <p className="flex">
                Faça uma sessão para adicionar produtos no seu link
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-title text-lg">Preview da coleção</h1>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-1"
              className="w-full rounded-xl border bg-stone-100 px-6"
            >
              <AccordionItem value="item-1" className="w-full border-0">
                <AccordionTrigger className="text-light text-sm text-black ">
                  {data.name}
                </AccordionTrigger>

                <AccordionContent className="w-full">
                  <ProductLink products={data.products} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="mb-6 flex w-full flex-col gap-1">
            <GridContents siteId={`${data.siteId}`} openActions={true} />
          </div>
        </div>
      </section>
    </div>
  );
}
