import BackButton from "@/components/global/back-button";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Edit } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import CollectionCard from "./_components/collection-card";

export default async function CollectionPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.category.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      collections: true,
      site: {
        select: {
          id: true,
          subdomain: true,
        },
      },
    },
  });
  if (!data) {
    notFound();
  }

  const collections = await prisma.collection.findMany({
    where: {
      siteId: decodeURIComponent(data.siteId!),
    },
  });

  return (
    <div className="flex max-w-screen-xl flex-col space-y-6">
      <div className="grid grid-cols-1 items-center justify-start gap-6 lg:flex lg:flex-row">
        <BackButton />
        <div className="flex flex-col">
          <h1 className="font-title text-2xl">Adicione coleções ou páginas</h1>
          <p className="flex">
            Faça uma sessão para adicionar artigos no seu link
          </p>
        </div>
      </div>
      {/* <div className="flex flex-col gap-6 lg:flex-row">
        <div>
          <h1 className="font-title text-3xl font-bold dark:text-white">
            Edição de categorias
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Adicione quantos produtos desejar. Para alterar nome, descrição e
            imagens clique em configurações.
          </p>
        </div>
      </div> */}
      <div className="flex flex-col gap-4">
        <button className="flex items-center gap-2 text-stone-500 hover:text-stone-600">
          <h3 className="font-cal  text-2xl">
            {data.name || "Digite o nome da categoria"}
          </h3>
          <Edit className="" size={20} />
        </button>
        <button className="flex items-center gap-2 text-stone-400 hover:text-stone-600">
          <h3 className="text-lg font-light">
            {data.description || "Faça uma descrição personalizada"}
          </h3>
          <Edit className="" size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {collections.map((collection: any, idx: number) => (
          <CollectionCard
            data={data}
            key={`key-collection-${idx}`}
            collection={collection}
          />
        ))}
      </div>
    </div>
  );
}
