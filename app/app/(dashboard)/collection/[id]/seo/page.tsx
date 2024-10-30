import Form from "@/components/form";
import { updateCollectionMetadata } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import WrapperContentSeo from "./_components/wrapper-content-seo";

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
    <div className="flex max-w-screen-xl flex-col">
      <div className="flex flex-col space-y-6">
        <h1 className="font-title text-3xl font-bold dark:text-white">
          Otimização de conteúdo
        </h1>
        <Form
          title="URL da coleção"
          description="The slug is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."
          helpText="Please use a slug that is unique to this post."
          inputAttrs={{
            name: "slug",
            type: "text",
            defaultValue: data?.slug!,
            placeholder: "slug",
          }}
          handleSubmit={updateCollectionMetadata}
        />

        <Form
          title="Nome longo da coleção"
          description="The slug is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."
          helpText="Please use a slug that is unique to this post."
          inputAttrs={{
            name: "longName",
            type: "text",
            defaultValue: data?.longName!,
            placeholder: "longName",
          }}
          handleSubmit={updateCollectionMetadata}
        />

        <Form
          title="Descrição da coleção"
          description="Insira uma descrição que forneça informações adicionais ou detalhes sobre sua coleção. Isso ajudará os usuários a entenderem melhor o conteúdo ou contexto relacionado a este campo."
          helpText="Please use a slug that is unique to this post."
          inputAttrs={{
            name: "description",
            type: "description",
            defaultValue: data?.description!,
            placeholder: "description",
          }}
          handleSubmit={updateCollectionMetadata}
        />

        <WrapperContentSeo data={data} />
      </div>
    </div>
  );
}
