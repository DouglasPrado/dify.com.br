import OverviewPlanningCTA from "@/app/app/(dashboard)/site/[id]/planning/_components/overview-planning-cta";
import { getSession } from "@/lib/auth";
import { getClicksFromSearchConsole } from "@/lib/google";
import prisma from "@/lib/prisma";
import {
  Combine,
  LayoutList,
  // GitCompare,
  // Layout,
  // MessageSquare,
  Newspaper,
  ScanBarcode,
} from "lucide-react";
import { notFound, redirect } from "next/navigation";

export default async function SitePlanning({
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
  const today = new Date();
  const endDate = today.toISOString().split("T")[0]; // Data de hoje no formato YYYY-MM-DD
  const startDate = new Date(today.setDate(today.getDate() - 30))
    .toISOString()
    .split("T")[0]; // 30 dias atrás no formato YYYY-MM-DD
  const google = getClicksFromSearchConsole(
    "https://melhoresmultimidia.com.br",
    startDate,
    endDate,
  );
  return (
    <>
      <div className="flex flex-col items-start justify-between space-y-6 ">
        <div className="flex flex-col items-start gap-3 space-y-2 sm:space-y-0">
          <h1 className="w-60 truncate font-title text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
            Gerador de conteúdo
          </h1>
          <h2 className="text-sm text-stone-700">
            Gere novos conteúdos de forma automatizada baseada no perfil da sua
            plataforma.
          </h2>
        </div>
        {JSON.stringify(google)}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <OverviewPlanningCTA
            color="rose"
            title="Notícias"
            type="post"
            description="Faça agendamento das postagens automaticas utilizando I.A da dify."
            icon={<Newspaper className="text-white" />}
          />
          <OverviewPlanningCTA
            color="amber"
            title="Listas"
            type="post"
            description="Faça agendamento das postagens automaticas utilizando I.A da dify."
            icon={<LayoutList className="text-white" />}
          />
          <OverviewPlanningCTA
            color="fuchsia"
            title="Comparação"
            type="post"
            description="Faça agendamento das postagens automaticas utilizando I.A da dify."
            icon={<Combine className="text-white" />}
          />

          <OverviewPlanningCTA
            color="emerald"
            title="Produtos"
            type="post"
            description="Faça agendamento das postagens automaticas utilizando I.A da dify."
            icon={<ScanBarcode className="text-white" />}
          />
        </div>
      </div>
    </>
  );
}
