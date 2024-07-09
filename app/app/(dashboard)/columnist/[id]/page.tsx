import Form from "@/components/form";
import { updateColumnistMetadata } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function ColumnistPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.columnist.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });
  if (!data) {
    notFound();
  }

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <h1 className="font-title text-3xl font-bold dark:text-white">
        {data.name
          ? `Editando o redator: ${data.name}`
          : "Começe a criar o redator"}
      </h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Form
          title="Foto para thumb do redator"
          description="A imagem de destaque da página do redator. Formatos aceitos: .png, .jpg, .jpeg"
          helpText="Tamanho máximo do arquivo 50 MB. Tamanho recomendado 1200x630."
          inputAttrs={{
            name: "image",
            type: "file",
            defaultValue: data?.image!,
          }}
          handleSubmit={updateColumnistMetadata}
        />
        <div className="col-span-2 grid h-full gap-6">
          <Form
            title="Nome do redator"
            description="Nome a qual o redator é reconhecido na comunidade."
            helpText="Crie nome com até 72 caracteres"
            inputAttrs={{
              name: "name",
              type: "text",
              defaultValue: data?.name!,
              placeholder: "Nome",
            }}
            handleSubmit={updateColumnistMetadata}
          />
          <div className="flex flex-col space-y-6">
            <Form
              title="Descrição"
              description="Fale um pouco sobre o redator, escreva algo que o leitor vai gostar de saber!"
              helpText=""
              inputAttrs={{
                name: "description",
                type: "text",
                defaultValue: data?.description!,
                placeholder: "Descrição",
              }}
              handleSubmit={updateColumnistMetadata}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
