import Form from "@/components/form";
import DeleteKnowledgeForm from "@/components/form/delete-knowledge-form";
import BackButton from "@/components/global/back-button";
import { updateKnowledgeMetadata } from "@/lib/actions/knowledge";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SiteKnowledgeCreateKnowledgeId({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.knowledge.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      knowledgeItems: true,
    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-start gap-3 space-y-2 sm:space-y-0">
          <div className="flex items-center justify-start gap-6 lg:flex lg:flex-row">
            <BackButton link={`/knowledge/${params.id}/fonts`} />
            <div className="flex flex-col">
              <h1 className="w-60 truncate font-title text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
                Configurações de Conhecimento
              </h1>
              <h2 className="text-sm text-stone-700">
                Crie uma base de conhecimento para ganhar potência de
                inteligencia e criar conteúdos autenticos.
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Form
          title="Alterar o nome da pasta"
          description="Nome de referência para guardar toda a base de conhecimento em uma pasta"
          helpText="Adicione um nome claro que dê para entender o conteúdo da pasta"
          inputAttrs={{
            name: "title",
            type: "text",
            defaultValue: data?.title!,
            placeholder: "title",
          }}
          handleSubmit={updateKnowledgeMetadata}
        />
      </div>
      <div className="">
        <Form
          title="Selecione uma interface"
          description="Nome de referência para guardar toda a base de conhecimento em uma pasta"
          helpText="Adicione um nome claro que dê para entender o conteúdo da pasta"
          inputAttrs={{
            name: "interface",
            type: "select",
            defaultValue: data?.interface!,
            placeholder: "interface",
          }}
          handleSubmit={updateKnowledgeMetadata}
        />
      </div>
      <div className="flex flex-col gap-6">
        <DeleteKnowledgeForm pageName={data.title} />
      </div>
    </>
  );
}
