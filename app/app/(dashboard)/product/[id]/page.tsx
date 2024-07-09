import Form from "@/components/form";
import { updateProductMetadata } from "@/lib/actions";
import { addProductSection } from "@/lib/actions/product-sections";
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

        <div className="flex flex-col gap-3">
          <h2 className="font-title text-xl dark:text-white">Benefícios</h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Liste os principais beneficios do produto.
          </p>
        </div>
        <Form
          title="Titulo para o benefício"
          description="Crie um texto para ir no inicio da sessão de beneficios. Essa chamada é importante para levar o usuário para a sessão."
          helpText="Crie um título com até 72 caracteres"
          inputAttrs={{
            name: "titleBenefits",
            type: "text",
            defaultValue: data?.titleBenefits!,
            placeholder: "Titulo dos beneficios",
          }}
          handleSubmit={updateProductMetadata}
        />
        <Form
          title="Benefícios"
          description="Faça uma lista com benefícios do produto."
          helpText="Limite até 30 caracteres para a descrição e para o título até 10 caracteres."
          formButton={false}
          data={data.sections.filter(
            (section) => section.reference === "benefits",
          )}
          inputAttrs={{
            name: "benefits",
            placeholder: "Beneficios",
            type: "json",
            inputs: [
              {
                defaultValue: "",
                placeholder: "Titulo",
                type: "text",
                name: "title",
              },
              {
                defaultValue: "",
                placeholder: "Descrição",
                type: "text",
                name: "description",
              },
            ],
          }}
          handleSubmit={addProductSection}
        />
        <Form
          title="Garantia"
          description="Descreva uma garantia para o seu produto."
          helpText="Limite até 70 caracteres para a descrição"
          formButton={false}
          data={data.sections.filter(
            (section) => section.reference === "guarantee",
          )}
          inputAttrs={{
            name: "guarantee",
            type: "json",
            placeholder: "Garantia",
            inputs: [
              {
                defaultValue: "",
                placeholder: "Título",
                type: "text",
                name: "title",
              },
              {
                defaultValue: "",
                placeholder: "Descrição",
                type: "text",
                name: "description",
              },
            ],
          }}
          handleSubmit={addProductSection}
        />
      </div>
    </div>
  );
}
