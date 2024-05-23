import OverviewPlanningCTA from "@/app/app/(dashboard)/site/[id]/planning/_components/overview-planning-cta";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  // GitCompare,
  // Layout,
  // MessageSquare,
  Newspaper,
  Share2,
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

  return (
    <>
      <div className="flex flex-col items-start justify-between space-y-6 ">
        <div className="flex flex-col items-start gap-3 space-y-2 sm:space-y-0">
          <h1 className="w-60 truncate font-cal text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
            Automação de conteúdo
          </h1>
          <h2 className="text-sm text-slate-700">
            Experimente nossas soluções de campanha para você utilizar em vários
            cenários
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <OverviewPlanningCTA
            color="orange"
            title="Postagens"
            type="post"
            description="Faça agendamento das postagens automaticas utilizando I.A da dify."
            icon={<Newspaper className="text-white" />}
          />
          {/* <OverviewPlanningCTA
            color="emerald"
            title="Produtos"
            type="product"
            description="Crie landing pages automáticamente utilizando I.A da dify"
            icon={<ShoppingCart className="text-white" />}
          />
          <OverviewPlanningCTA
            color="indigo"
            title="Páginas"
            type="page"
            description="Crie páginas com informações relevantes automáticamente utilizando I.A da dify"
            icon={<Layout className="text-white" />}
          /> */}
          <OverviewPlanningCTA
            color="rose"
            title="Sociais"
            type="social"
            description="Crie postagens sociais com informações relevantes automáticamente utilizando I.A da dify"
            icon={<Share2 className="text-white" />}
          />
          {/* <OverviewPlanningCTA
            color="teal"
            title="Automação"
            type="automation"
            description="Faça automações para transformar seus leads em clientes."
            icon={<GitCompare className="text-white" />}
          />
          <OverviewPlanningCTA
            color="violet"
            title="Notificações"
            type="notification"
            description="Faça notificações para seus leads"
            icon={<MessageSquare className="text-white" />}
          /> */}
        </div>
      </div>
    </>
  );
}
