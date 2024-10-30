import BackButton from "@/components/global/back-button";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Bolt } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import FontCard from "../_components/font-card";
import FormKnowledge from "../_components/form-knowledge";
import TableKnowledge from "../_components/table-knowledge";

export default async function SiteKnowledgeCreateKnowledgeId({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.knowledge.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      knowledgeItems: true,
    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-start gap-3 space-y-2 sm:space-y-0">
          <div className="flex items-center justify-start gap-6 lg:flex lg:flex-row">
            <BackButton link={`/site/${data.siteId}/knowledges`} />
            <div className="flex flex-col">
              <h1 className="w-60 truncate font-title text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
                Conhecimento
              </h1>
              <h2 className="text-sm text-stone-700">
                Crie uma base de conhecimento para ganhar potência de
                inteligencia e criar conteúdos autenticos.
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="font-cal text-stone-800">Escolher fonte de dados</h2>
        <div className="my-3 grid grid-cols-1 gap-3 xl:grid-cols-3">
          <FontCard
            name="text"
            label="Texto"
            description="Envie textos"
            icon="Text"
          />
          <FontCard
            label="Youtube"
            name="youtube"
            description="Envie links do youtube"
            icon="Youtube"
          />
          <FontCard
            label="Link"
            name="url"
            description="Envie links de sites"
            icon="Link2"
          />
        </div>
      </div>
      <FormKnowledge />
      <div>
        <Link
          href={`/knowledge/${params.id}/settings`}
          className="flex items-center gap-1 text-sm text-stone-800 hover:underline"
        >
          <Bolt size={16} /> Configurações avançadas
        </Link>
      </div>
      <TableKnowledge data={data} />
    </>
  );
}
