import BackButton from "@/components/global/back-button";
import prisma from "@/lib/prisma";
import { Collection } from "@prisma/client";
import CollectionCard from "./_components/collection-card";
import CreateCollectionButton from "./_components/create-collection-button";

export default async function SiteSalesCollections({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.collection.findMany({
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
            <h1 className="font-title text-2xl">Coleções</h1>
            <p className="flex">
              Listagem de coleções de artigos e páginas
            </p>
          </div>
        </div>
        <CreateCollectionButton />
      </div>
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {data.map((collection: Collection, idx: number) => (
          <CollectionCard data={collection} key={idx} />
        ))}
      </section>
    </>
  );
}
