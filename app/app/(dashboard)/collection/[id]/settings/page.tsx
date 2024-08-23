import Form from "@/components/form";
import DeleteCollectionForm from "@/components/form/delete-collection-form";
import { updateCollectionMetadata } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function CollectionSettings({
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
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-title text-3xl font-bold dark:text-white">
          Configurações da coleção
        </h1>
        
        <Form
          title="Nome da coleção"
          description="The slug is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."
          helpText="Please use a slug that is unique to this post."
          inputAttrs={{
            name: "name",
            type: "text",
            defaultValue: data?.name!,
            placeholder: "name",
          }}
          handleSubmit={updateCollectionMetadata}
        />

        <Form
          title="Descrição curta da coleção"
          description="Insira uma descrição que forneça informações adicionais ou detalhes sobre sua coleção. Isso ajudará os usuários a entenderem melhor o conteúdo ou contexto relacionado a este campo."
          helpText="Please use a slug that is unique to this post."
          inputAttrs={{
            name: "shortDescription",
            type: "shortDescription",
            defaultValue: data?.shortDescription!,
            placeholder: "shortDescription",
          }}
          handleSubmit={updateCollectionMetadata}
        />

        <Form
          title="Descrição curta"
          description="Insira uma descrição que forneça informações adicionais ou detalhes sobre sua coleção. Isso ajudará os usuários a entenderem melhor o conteúdo ou contexto relacionado a este campo."
          helpText="Please use a slug that is unique to this post."
          inputAttrs={{
            name: "shortDescription",
            type: "shortDescription",
            defaultValue: data?.shortDescription!,
            placeholder: "shortDescription",
          }}
          handleSubmit={updateCollectionMetadata}
        />

        <Form
          title="Adicione uma capa para coleção"
          description="Faça upload ou selecione uma imagem para servir como capa representativa da sua coleção de produtos. A capa é a primeira impressão que os clientes terão da sua coleção e pode ajudar a destacar o tema ou estilo exclusivo dos itens que ela contém. "
          helpText="Escolha uma imagem de alta qualidade que transmita a essência da sua coleção."
          inputAttrs={{
            name: "image",
            type: "file",
            defaultValue: data?.image!,
            placeholder: "image",
          }}
          handleSubmit={updateCollectionMetadata}
        />

        <DeleteCollectionForm collectionName={data?.name!} />
      </div>
    </div>
  );
}
