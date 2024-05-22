import GridContents from "@/components/grid-contents";
import Slider from "@/components/slider";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export default async function CollectionPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.collection.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      posts: true,
      products: true,
      site: {
        select: {
          subdomain: true,
        },
      },
    },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="flex max-w-screen-xl flex-col space-y-6">
      <div className="flex flex-col gap-6 lg:flex-row ">
        <Image
          alt={`[${data.name}]`}
          src={data.image || "#"}
          width={250}
          height={250}
        />
        <div>
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Editar {data.name}
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Adicione quantos produtos desejar. Para alterar nome, descrição e
            imagens clique em configurações.
          </p>
          <p className="line-clamp-3 py-6 text-sm font-light text-stone-400 dark:text-stone-300">
            {data.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 pb-3">
        <h1 className="font-cal text-lg">{"Produtos dessa coleção:"}</h1>
        <Slider
          data={data.products}
          errorMessage="Não existe produtos nessa coleção."
        />
      </div>
      <div className="flex flex-col gap-3 pb-6">
        <h1 className="font-cal text-lg">{"Artigos dessa coleção:"}</h1>
        <Slider
          data={data.posts}
          errorMessage="Não existe artigos nessa coleção."
        />
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="font-cal text-lg">
          {"Pesquise por novos itens para a sua coleção:"}
        </h1>
        <GridContents siteId={`${data.siteId}`} openActions={true} />
      </div>
    </div>
  );
}
