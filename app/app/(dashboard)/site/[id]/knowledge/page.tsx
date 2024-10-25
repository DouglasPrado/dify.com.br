import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Knowledge, KnowledgeItem } from "@prisma/client";
import { redirect } from "next/navigation";
import KnowledgeCard from "./_components/knowledge-card";
import KnowledgeCardCreate from "./_components/knowledge-card-create";

export default async function SiteIntegrations({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.knowledge.findMany({
    where: {
      siteId: decodeURIComponent(params.id),
    },
    include: { knowledgeItems: true },
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-start gap-3 space-y-2 sm:space-y-0">
          <h1 className="w-60 truncate font-title text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
            Conhecimento
          </h1>
          <h2 className="text-sm text-stone-700">
            Crie uma base de conhecimento para ganhar potência de inteligencia e
            criar conteúdos autenticos.
          </h2>
        </div>
      </div>
      <div className="my-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        <KnowledgeCardCreate data={{}} />
        {data.map(
          (
            knowledge: Knowledge & { knowledgeItems: KnowledgeItem[] },
            idx: number,
          ) => (
            <KnowledgeCard key={`key-knowledge-${idx}`} data={knowledge} />
          ),
        )}
      </div>
    </div>
  );
}
