import CreateLaunchButton from "@/app/app/(dashboard)/site/[id]/planning/launch/_components/create-launch-button";
import Launches from "@/app/app/(dashboard)/site/[id]/planning/launch/_components/launches";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function SiteLaunch({
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
      <div className="flex-co flex items-center  justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-start gap-3 space-y-2 sm:space-y-0">
          <h1 className="w-60 truncate font-title text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
            Agendamento em massa
          </h1>
          <h2 className="text-sm text-stone-700">
            Crie agendamento de conteúdo em massa. Agende postagens de artigos,
            criação e desenvolvimento de produtos.
          </h2>
        </div>
        <CreateLaunchButton />
      </div>
      <Launches siteId={data.id} />
    </>
  );
}
