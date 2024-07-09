import Form from "@/components/form";
import { updateLaunchMetadata } from "@/lib/actions/launch";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function LaunchDetails({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.launch.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      site: {
        select: {
          subdomain: true,
        },
      },
    },
  });
  if (!data) {
    notFound();
  }

  return (
    <div className="w-full flex-col px-8 py-6">
      <div className="w-full ">
        <h2 className="font-title text-xl">Nome da campanha</h2>
        <p className="font-light text-gray-800">
          Crie um nome para sua campanha para distribuir os conteúdos
        </p>
      </div>
      <div className="flex w-full flex-col gap-6 py-6">
        <Form
          title="Informe o nome da sua campanha"
          description="Nome é usado para referencia de campanha."
          helpText="Pode utilizar Max. 70 caracteres."
          inputAttrs={{
            name: "name",
            type: "text",
            defaultValue: data?.name!,
            placeholder: "Nome",
          }}
          handleSubmit={updateLaunchMetadata}
        />
      </div>
    </div>
  );
}
