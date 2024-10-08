import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
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
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

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
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <KnowledgeCardCreate data={{}} />
        <KnowledgeCard
          data={{
            title: "Site Principal",
            kwords: 200,
            documents: 7,
          }}
        />
        <KnowledgeCard
          data={{
            title: "Novas Ideias",
            kwords: 200,
            documents: 20,
          }}
        />
      </div>
    </div>
  );
}
