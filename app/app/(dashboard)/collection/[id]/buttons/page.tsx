import Form from "@/components/form";
import BackButton from "@/components/global/back-button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { updateCollectionMetadata } from "@/lib/actions";
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
            <BackButton />
            <div className="flex flex-col">
              <h1 className="font-title text-2xl">Adicione produtos</h1>
              <p className="flex">
                Faça uma sessão para adicionar produtos no seu link
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-title text-lg">Preview do botão</h1>
            <Accordion
              type="single"
              collapsible={false}
              className="w-full rounded-xl border bg-stone-100 px-6"
            >
              <AccordionItem value={data.id} className="w-full border-0">
                <AccordionTrigger className="text-light text-sm text-black ">
                  {data.name}
                </AccordionTrigger>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="py-6">
          <Form
            title="Nome da coleção"
            description="The slug is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."
            helpText="Please use a slug that is unique to this post."
            inputAttrs={{
              name: "name",
              type: "text",
              defaultValue: data?.name!,
              placeholder: "name",
            }}
            handleSubmit={updateCollectionMetadata}
          />
        </div>

        <div className="py-6">
          <Form
            title="Link"
            description="The slug is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."
            helpText="Please use a slug that is unique to this post."
            inputAttrs={{
              name: "slug",
              type: "text",
              defaultValue: data?.slug!,
              placeholder: "slug",
            }}
            handleSubmit={updateCollectionMetadata}
          />
        </div>
      </section>
    </div>
  );
}
