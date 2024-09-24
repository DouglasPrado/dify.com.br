import Form from "@/components/form";
import { updateProductMetadata } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function ProductPage({
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
      sections: true,
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
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <h1 className="font-title text-3xl font-bold dark:text-white">
        Edição para {data.title}
      </h1>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col gap-3">
          <h2 className="font-title text-xl dark:text-white">
            Seção principal
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Edite as informações da primeira dobra do site.
          </p>
        </div>
        <Form
          title="Palavra chave"
          description="Criar um título envolvente para o seu produto é essencial para destacá-lo no mercado e atrair a atenção do seu público-alvo. "
          helpText="Crie um título com até 72 caracteres"
          inputAttrs={{
            name: "keywords",
            type: "text",
            defaultValue: data?.keywords!,
            placeholder: "Palavras Chave",
          }}
          handleSubmit={updateProductMetadata}
        />
        <Form
          title="Nome do produto"
          description="Criar um título envolvente para o seu produto é essencial para destacá-lo no mercado e atrair a atenção do seu público-alvo. "
          helpText="Crie um título com até 72 caracteres"
          inputAttrs={{
            name: "title",
            type: "text",
            defaultValue: data?.title!,
            placeholder: "Nome",
          }}
          handleSubmit={updateProductMetadata}
        />
        <Form
          title="Preço do produto"
          description="Os preços do produto deverá ser em centavos, por exemplo: R$ 25,00 adicionar no campo 2500"
          helpText="Adicione o valor em centavos."
          inputAttrs={{
            name: "price",
            type: "text",
            defaultValue: `${data?.price}`,
            placeholder: "Preço de venda",
          }}
          handleSubmit={updateProductMetadata}
        />
        <div className="grid grid-cols-2 gap-6">
          <Form
            title="Subchamada"
            description="Faça uma chamada impactante sobre o seu produto, esse texto irá ficar acima do título do produto."
            helpText="Crie uma subchamada com até 32 caracteres"
            inputAttrs={{
              name: "subTitle",
              type: "text",
              defaultValue: data?.subTitle!,
              placeholder: "Chamada secundária",
            }}
            handleSubmit={updateProductMetadata}
          />

          <Form
            title="Breve descrição"
            description="Crie uma descrição explicativa sobre o seu produto, é recomendado estar dentro de uma lista com os principais beneficios do produto"
            helpText="Faça uma lista para manter a página do produto harmoniozo."
            inputAttrs={{
              name: "shortDescription",
              type: "description",
              defaultValue: data?.shortDescription!,
              placeholder: "Breve descrição",
            }}
            handleSubmit={updateProductMetadata}
          />
        </div>
      </div>
    </div>
  );
}
