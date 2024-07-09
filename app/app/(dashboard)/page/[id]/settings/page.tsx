import Form from "@/components/form";
import DeletePageForm from "@/components/form/delete-page-form";
import { updatePageMetadata } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function PageSettings({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.page.findUnique({
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
          Configurações da página
        </h1>
        <Form
          title="Personalize o slug da página"
          description="O slug é a versão do nome compatível com URL. Geralmente é tudo em letras minúsculas e contém apenas letras, números e hifens."
          helpText="Use um slug exclusivo para esta página."
          inputAttrs={{
            name: "slug",
            type: "text",
            defaultValue: data?.slug!,
            placeholder: "slug",
          }}
          handleSubmit={updatePageMetadata}
        />

        <Form
          title="Imagem de destaque"
          description="A imagem de destaque da sua página. Formatos aceitos: .png, .jpg, .jpeg"
          helpText="Tamanho máximo do arquivo 50 MB. Tamanho recomendado 1200x630."
          inputAttrs={{
            name: "image",
            type: "file",
            defaultValue: data?.image!,
          }}
          handleSubmit={updatePageMetadata}
        />

        <DeletePageForm pageName={data?.title!} />
      </div>
    </div>
  );
}
