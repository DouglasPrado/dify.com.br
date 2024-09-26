import Planning from "@/app/app/(dashboard)/site/[id]/planning/_components/planning";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
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
      <div className="flex flex-col items-center justify-between space-y-6 sm:flex-row ">
        <div className="flex flex-col items-start gap-3 space-y-2 sm:space-y-0">
          <h1 className="w-60 truncate font-title text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
            Calendário de conteúdo
          </h1>
          <h2 className="text-sm text-stone-700">
            Acompanhe o calendário feito no planejamento do seu negócio. Agende
            postagens de artigos, criação e desenvolvimento de produtos.
          </h2>
        </div>
      </div>
      <Planning siteId={data.id} />
    </>
  );
}
