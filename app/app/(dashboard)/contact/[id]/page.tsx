import Contacts from "@/app/app/(dashboard)/contact/[id]/_components/contacts";
import SubNav from "@/components/global/subnav";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export default async function ContactPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.whitelist.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      leads: true,
      site: {
        select: {
          subdomain: true,
        },
      },
    },
  });
  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <h1 className="font-title text-3xl font-bold dark:text-white">
        Lista de leads interessados no {data.name}
      </h1>
      <p className="text-sm text-stone-500 dark:text-stone-400">
        Todos os contatos de pessoas que se interessaram pelo produto{" "}
        {data.name}
      </p>
      <div className="flex w-full items-center justify-start gap-1 pt-2">
        <Image
          src={`https://www.google.com/s2/favicons?sz=64&domain_url=${data.utm_source}`}
          alt={`[${data.utm_source}]`}
          className="mr-1"
          width={20}
          height={20}
        />
        <div className="text-sm uppercase text-gray-700">
          [{data.utm_source}]
        </div>
        <div className="text-sm uppercase text-gray-700">
          {data.utm_campaign}
        </div>
        <div className="text-sm uppercase text-gray-700 ">
          [{data.utm_medium}]
        </div>
        <div className="text-sm uppercase text-gray-700">
          {data.utm_content}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 py-12">
        <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2 ">
          <SubNav title="Visitas" description="23 leads" />
          {/* <ArrowDownSquare className="text-stone-600" /> */}
          <SubNav title="Clicou no botão" description="10 leads" />
          {/* <ArrowDownSquare className="text-stone-600" /> */}
          <SubNav title="Carrinho" description="1 lead" />
          {/* <ArrowDownSquare className="text-stone-600" /> */}
          <SubNav title="Recuperação de carrinho" description="9 leads" />
          {/* <ArrowDownSquare className="text-stone-600" /> */}
          <SubNav title="Pagamento" description="1 lead" />
          {/* <ArrowDownSquare className="text-stone-600" /> */}
          <SubNav title="Upsell 01" description="0 leads" />
          {/* <ArrowDownSquare className="text-stone-600" /> */}
          <SubNav title="Upsell 02" description="0 leads" />
          {/* <ArrowDownSquare className="text-stone-600" /> */}
          <SubNav title="Downsell 02" description="0 leads" />
        </div>
        <div className="col-span-3 flex w-full flex-col gap-6">
          <Contacts />
        </div>
      </div>
    </div>
  );
}
