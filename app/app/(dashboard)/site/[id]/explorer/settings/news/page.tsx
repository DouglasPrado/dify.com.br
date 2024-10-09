import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import FormNews from "./_components/form-news";

export default async function SettingsKeywords({
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
  if (!data) {
    notFound();
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center justify-between sm:flex-row sm:space-y-0">
          <div className="flex flex-col items-start gap-3 space-y-2 sm:space-y-0">
            <h1 className="w-60 truncate font-title text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
              Notícias
            </h1>
            <h2 className="text-sm text-stone-700">
              Inclua sites de notícias para incluir na pesquisa de novas ideias.
            </h2>
          </div>
        </div>
      </div>
      <FormNews />
    </div>
  );
}
