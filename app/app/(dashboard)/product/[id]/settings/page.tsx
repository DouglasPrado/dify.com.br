import Form from "@/components/form";
import DeleteProductForm from "@/components/form/delete-product-form";
import { updateProductMetadata } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function ProductSettings({
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
  });
  if (!data) {
    notFound();
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-title text-3xl font-bold dark:text-white">
          Product Settings
        </h1>
        <Form
          title="Personalize o slug do produto"
          description="O slug é a versão do nome compatível com URL. Geralmente é tudo em letras minúsculas e contém apenas letras, números e hifens."
          helpText="Use um slug exclusivo para este produto."
          inputAttrs={{
            name: "url",
            type: "text",
            defaultValue: data?.url!,
            placeholder: "slug",
          }}
          handleSubmit={updateProductMetadata}
        />
        <Form
          title="URL Clone"
          description="Para aumentar a velocidade da criação do produto cole uma referencia de produto semelhante."
          helpText="Somente para produtos físicos."
          inputAttrs={{
            name: "urlClone",
            type: "text",
            defaultValue: data?.urlClone!,
            placeholder: "urlClone",
          }}
          handleSubmit={updateProductMetadata}
        />
        <Form
          title="Cores do produto"
          description="Altere as cores baseadas em códigos hexadecimais."
          helpText="Cuidado para não excluir o conteúdo dessa página."
          inputAttrs={{
            name: "colors",
            type: "text",
            defaultValue: JSON.stringify(data?.colors!),
            placeholder: "cores",
          }}
          handleSubmit={updateProductMetadata}
        />
        <Form
          title="ProductId Stripe"
          description="ProductId é um código de referencia sobre os produtos cadastrados no Stripe."
          helpText="Sem o código do produto não será possivel processar pagamento."
          inputAttrs={{
            name: "productId",
            type: "text",
            defaultValue: data?.productId!,
            placeholder: "productId",
          }}
          handleSubmit={updateProductMetadata}
        />

        <DeleteProductForm productName={data?.title!} />
      </div>
    </div>
  );
}
