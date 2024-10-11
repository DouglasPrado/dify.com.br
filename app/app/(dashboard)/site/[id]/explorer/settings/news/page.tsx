import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import FormNews from "./_components/form-news";
import NewsCard from "./_components/news-card";

export default async function SettingsNews({
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
    include: {
      competitions: {
        where: {
          type: "news", // Filtra as competitions com o tipo 'news'
        },
      },
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
              Inclua sites de notícias para acompanhar novidades e ter novas
              ideias.
            </h2>
          </div>
        </div>
      </div>
      <FormNews siteId={params.id} />
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-stone-900">
          Lista de site de notícias
        </h2>
        {data.competitions.map((competition: any, idx: number) => (
          <NewsCard
            key={`key-competition-${competition.id}`}
            competition={competition}
          />
        ))}
      </div>
    </div>
  );
}
