import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Explorer from "./_components/explorer";

export default async function SiteExplorer({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.idea.findMany({
    where: {
      siteId: decodeURIComponent(params.id),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-start gap-3 space-y-2 sm:space-y-0">
          <h1 className="w-60 truncate font-title text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
            Explorar
          </h1>
          <h2 className="text-sm text-stone-700">
            Campos de ideias para você incrementar seu site com o conteúdo
            gerado por nossa IA.
          </h2>
        </div>
      </div>

      <Explorer data={data} />
    </>
  );
}
