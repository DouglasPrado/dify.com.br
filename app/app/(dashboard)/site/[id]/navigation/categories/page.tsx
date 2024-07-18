import BackButton from "@/components/global/back-button";
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import CategoryCard from "./_components/category-card";
import CreateCollectionButton from "./_components/create-category-button";

export default async function SiteSalesCollections({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.category.findMany({
    where: {
      siteId: decodeURIComponent(params.id),
    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="grid grid-cols-1 items-center justify-start gap-6 lg:flex lg:flex-row">
          <BackButton>Voltar</BackButton>
          <div className="flex flex-col">
            <h1 className="font-title text-2xl">Categorias</h1>
            <p className="flex">
              Listagem de categorias de artigos e páginas
            </p>
          </div>
        </div>
        <CreateCollectionButton />
      </div>
      <section className="grid grid-cols-1 gap-2 lg:grid-cols-1">
        {data.map((category: Category, idx: number) => (
          <CategoryCard data={category} key={idx} />
        ))}
      </section>
    </>
  );
}
