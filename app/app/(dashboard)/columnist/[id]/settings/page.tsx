import Form from "@/components/form";
import DeleteProductForm from "@/components/form/delete-product-form";
import { updateProductMetadata } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function ColumnistSettings({
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
      <div className="flex flex-col space-y-6">
        <h1 className="font-title text-3xl font-bold dark:text-white">
          Configurações
        </h1>
        <Form
          title="Personalize o slug do produto"
          description="O slug é a versão do nome compatível com URL. Geralmente é tudo em letras minúsculas e contém apenas letras, números e hifens."
          helpText="Use um slug exclusivo para este produto."
          inputAttrs={{
            name: "slug",
            type: "text",
            defaultValue: data?.slug!,
            placeholder: "slug",
          }}
          handleSubmit={updateProductMetadata}
        />

        <DeleteProductForm productName={data?.name!} />
      </div>
    </div>
  );
}
