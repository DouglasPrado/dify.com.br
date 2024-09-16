import Form from "@/components/form";
import { addProductSection } from "@/lib/actions/product-sections";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function ProductReviews({
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
          Product F.A.Q.S
        </h1>
        <Form
          title="Perguntas frequentes"
          description="Descreva uma garantia para o seu produto."
          helpText="Limite até 70 caracteres para a descrição"
          formButton={false}
          data={data.sections.filter((section: any) => section.reference === "faq")}
          inputAttrs={{
            name: "faq",
            type: "json",
            inputs: [
              {
                defaultValue: "",
                placeholder: "Pergunta",
                type: "text",
                name: "ask",
              },
              {
                defaultValue: "",
                placeholder: "Resposta",
                type: "text",
                name: "answer",
              },
            ],
          }}
          handleSubmit={addProductSection}
        />
      </div>
    </div>
  );
}
