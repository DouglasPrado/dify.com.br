import Form from "@/components/form";
import BlurImage from "@/components/global/blur-image";
import { updateProductMetadata } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function ProductMedias({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.product.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      medias: true,
    },
  });
  if (!data) {
    notFound();
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-title text-3xl font-bold dark:text-white">
          Adicione mídias para o seu produto
        </h1>
        <Form
          title="Imagem de destaque"
          description="A imagem de destaque da sua página. Formatos aceitos: .png, .jpg, .jpeg"
          helpText="Tamanho máximo do arquivo 50 MB. Tamanho recomendado 1200x630."
          inputAttrs={{
            name: "image",
            type: "file",
            defaultValue: data?.image!,
          }}
          handleSubmit={updateProductMetadata}
        />
        <div className="flex flex-col gap-3 pb-12">
          <h2 className="font-title text-xl dark:text-white">
            Adicione fotos extras
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Escolha fotos atraentes para se mostrar o melhor que seu produto tem
            a oferecer.
          </p>
          <div className="grid grid-cols-3 gap-6 ">
            <div className="col-span-1">
              <Form
                key={`key-media-0`}
                title=""
                description=""
                helpText="Adicione fotos 600x600"
                inputAttrs={{
                  name: "media",
                  type: "file",
                }}
                handleSubmit={updateProductMetadata}
              />
            </div>

            <div className="col-span-2 grid grid-cols-5 gap-6">
              {data.medias.map((media: any, idxMedia: number) => (
                <div
                  key={`key-media-${idxMedia}`}
                  className="flex h-[160px] w-[160px] items-center justify-center rounded-lg  shadow-lg"
                >
                  <BlurImage
                    alt={media.slug ?? "Card thumbnail"}
                    width={500}
                    height={400}
                    className="h-full w-full rounded-lg object-cover"
                    src={media.slug ?? "/placeholder.png"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
