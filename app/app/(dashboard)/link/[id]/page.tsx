import Form from "@/components/form";
import { updateLinkMetadata } from "@/lib/actions/links";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function LinkPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.link.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      site: {
        select: {
          subdomain: true,
          name: true,
          description: true,
        },
      },
    },
  });

  if (!data) {
    notFound();
  }

  return (
    <div className="flex w-full max-w-7xl flex-col p-6 lg:p-10">
      <h1 className="font-title text-3xl font-bold dark:text-white">
        Link rápido personalizável
      </h1>
      <p className="text-sm text-stone-500 dark:text-stone-400">
        Tudo o que você é. Em um link simples na bio.
      </p>
      <div className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex w-full gap-1 ">
            <Form
              title="Nome"
              description="Melhore o titulo da página inicial."
              helpText="Por favor, utiliza no máximo 32 caracteres."
              inputAttrs={{
                name: "name",
                type: "text",
                defaultValue: data.site.name!,
                placeholder: "Ex: Douglas Prado",
                maxLength: 32,
              }}
              handleSubmit={updateLinkMetadata}
            />
          </div>

          <div className="flex w-full gap-1">
            <Form
              title="Descrição"
              description="Faça uma descrição sobre a sua página."
              helpText="Por favor, utiliza no máximo 72 caracteres."
              inputAttrs={{
                name: "description",
                type: "text",
                defaultValue: data.site.description!,
                placeholder: "Ex: Douglas Prado",
                maxLength: 32,
              }}
              handleSubmit={updateLinkMetadata}
            />
          </div>
        </div>
        <div className="flex h-full w-full gap-1">
          <Form
            title="Imagem de destaque"
            description="A imagem de destaque da sua página. Formatos aceitos: .png, .jpg, .jpeg"
            helpText="Tamanho máximo do arquivo 50 MB. Tamanho recomendado 1200x630."
            inputAttrs={{
              name: "image",
              type: "file",
              defaultValue: data?.image!,
            }}
            handleSubmit={updateLinkMetadata}
          />
        </div>
      </div>
    </div>
  );
}
