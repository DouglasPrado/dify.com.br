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
          Product Reviews
        </h1>
        <Form
          title="Avaliações de clientes"
          description="Quem comprou os produtos e ja utilizaram."
          helpText=""
          formButton={false}
          data={data.sections.filter(
            (section) => section.reference === "reviews",
          )}
          inputAttrs={{
            name: "reviews",
            type: "json",
            placeholder: "Avaliações",
            inputs: [
              {
                defaultValue: "",
                placeholder: "Cliente",
                type: "text",
                name: "name",
              },
              {
                defaultValue: "",
                placeholder: "Comentário",
                type: "text",
                name: "comment",
              },
              {
                defaultValue: "",
                placeholder: "Pontuação",
                type: "text",
                name: "stars",
              },
            ],
          }}
          handleSubmit={addProductSection}
        />
      </div>
    </div>
  );
}
