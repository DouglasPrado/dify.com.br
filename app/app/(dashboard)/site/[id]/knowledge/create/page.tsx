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
            Conhecimento
          </h1>
          <h2 className="text-sm text-slate-700">
            Crie uma base de conhecimento para ganhar potência de inteligencia e
            criar conteúdos autenticos.
          </h2>
        </div>
      </div>
      <div>
        Escolher fonte de dados Importar de arquivo de texto Sincronizar do
        Notion Sincronizar de site
        <hr />
        Enviar arquivo de texto
      </div>
    </>
  );
}
