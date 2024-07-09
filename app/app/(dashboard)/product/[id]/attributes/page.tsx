import Form from "@/components/form";
import { addProductSection } from "@/lib/actions/product-sections";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function ProductAttributes({
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
    },
  });
  if (!data) {
    notFound();
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-title text-3xl font-bold dark:text-white">
          Atributos do produto
        </h1>

        <Form
          title="Lista de atributos"
          description="Faça uma lista de atributos o seu produto."
          helpText="Limite até 70 caracteres para a descrição"
          formButton={false}
          data={data.sections.filter(
            (section) => section.reference === "attribute",
          )}
          inputAttrs={{
            name: "attribute",
            type: "json",
            placeholder: "Atributos",
            inputs: [
              {
                defaultValue: "",
                placeholder: "Título do atributo",
                type: "file",
                name: "image",
              },
              {
                defaultValue: "",
                placeholder: "Título do atributo",
                type: "text",
                name: "title",
              },
              {
                defaultValue: "",
                placeholder: "Preço do produto",
                type: "text",
                name: "price",
              },
              {
                defaultValue: "",
                placeholder: "Listagem dos atributos",
                type: "textarea",
                name: "list",
              },
            ],
          }}
          handleSubmit={addProductSection}
        />
      </div>
    </div>
  );
}
