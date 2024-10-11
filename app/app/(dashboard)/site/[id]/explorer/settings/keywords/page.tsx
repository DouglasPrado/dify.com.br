import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import KeywordsCard from "./_components/keywords";
import { KeywordsForm } from "./_components/keywords-form";

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
    include: { keywords: true },
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
              Palavras-chave
            </h1>
            <h2 className="text-sm text-stone-700">
              Inclua o máximo de palavras-chave para trabalhar novas ideias.
            </h2>
          </div>
        </div>
        <KeywordsForm siteId={data.id} />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-cal text-stone-700">
          Palavras incluídas para novas ideias
        </h3>
        <KeywordsCard data={data.keywords} />
      </div>
    </div>
  );
}
