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
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h4 className="w-60 truncate text-xl font-light dark:text-white sm:w-auto sm:text-2xl">
            Categorias
          </h4>
        </div>
        <CreateCollectionButton />
      </div>
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-1">
        {data.map((category: Category, idx: number) => (
          <CategoryCard data={category} key={idx} />
        ))}
      </section>
    </>
  );
}
