import Integrations from "@/app/app/(dashboard)/site/[id]/integrations/_components/integrations";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

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
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-start gap-3 space-y-2 sm:space-y-0">
          <h1 className="w-60 truncate font-title text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
            Integrações
          </h1>
          <h2 className="text-sm text-slate-700">
            Instale uma de nossas opções recomendadas abaixo ou navegue no
            mercado de integrações.
          </h2>
        </div>
      </div>
      <Integrations siteId={decodeURIComponent(params.id)} />
    </>
  );
}
