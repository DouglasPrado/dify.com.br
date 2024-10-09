import BackButton from "@/components/global/back-button";
import prisma from "@/lib/prisma";
import { Category, Collection } from "@prisma/client";
import { notFound } from "next/navigation";
import CollectionCard from "./_components/collection-card";
import CreateCollectionButton from "./_components/create-collection-button";

export default async function SiteSalesCollections({
  params,
}: {
  params: { id: string };
}) {
  const data: any = await prisma.category.findMany({
    where: {
      siteId: decodeURIComponent(params.id),
      collections: {
        some: {},
      },
    },
    include: {
      collections: {
        select: {
          id: true,
          name: true,
          image: true,
          slug: true,
          description: true,
          _count: {
            select: {
              posts: true,
            },
          },
        },
      },
    },
  });
  const others: any = await prisma.collection.findMany({
    where: {
      siteId: decodeURIComponent(params.id),
      categories: {
        none: {},
      },
    },
    include: {
      categories: true,
    },
  });
  if (!data) {
    notFound();
  }
  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="grid grid-cols-1 items-center justify-start gap-6 lg:flex lg:flex-row">
          <BackButton />
          <div className="flex flex-col">
            <h1 className="font-title text-2xl">Coleções</h1>
            <p className="flex">Listagem de coleções de artigos e páginas</p>
          </div>
        </div>
        <CreateCollectionButton />
      </div>
      {data.map(
        (
          category: Category & { collections: Collection[] },
          idxCategory: number,
        ) => (
          <div key={idxCategory} className="flex flex-col gap-2">
            <h1 className="font-cal text-lg text-stone-600">{category.name}</h1>
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-4">
              {category.collections.map(
                (collection: Collection, idx: number) => (
                  <CollectionCard data={collection} key={idx} />
                ),
              )}
            </section>
          </div>
        ),
      )}
      {others.length > 0 && (
        <div className="flex flex-col gap-2">
          <h1 className="font-cal text-lg text-stone-600">Outros</h1>
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {others.map((collection: Collection, idx: number) => (
              <CollectionCard data={collection} key={idx} />
            ))}
          </section>
        </div>
      )}
    </>
  );
}
