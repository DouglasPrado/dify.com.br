import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import ProductTemplate from "./_components/product-template";
import TemplateCard from "./_components/template-card";
import Steps from "@/components/global/steps";

export default async function PostSettings({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.post.findUnique({
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
        <div className="flex flex-col gap-1">
          <h2 className="font-cal text-3xl font-bold dark:text-white">
            Configurações do conteúdo
          </h2>
          <h3 className="text-sm font-light text-stone-700">{data.title}</h3>
        </div>
        <Steps
          steps={[
            { index: "01", name: "Template", selected: true },
            { index: "02", name: "Conhecimento", selected: false },
            { index: "03", name: "SEO", selected: false },
          ]}
        />
        <div className="flex flex-col">
          <h2 className="font-cal text-stone-800">Escolha um template</h2>
          <div className="my-6 grid grid-cols-1 gap-3 xl:grid-cols-3">
            <TemplateCard
              name="empty"
              label="Em branco"
              description="Conteúdo sem componentes"
              icon="BookOpen"
              defaultValue={data.template}
            />
            <TemplateCard
              name="product"
              label="Produto"
              description="Componentes de produtos"
              icon="ScanBarcode"
              defaultValue={data.template}
            />
            <TemplateCard
              name="compare"
              label="Comparação"
              description="Componentes de comparação de produtos"
              icon="Combine"
              defaultValue={data.template}
            />
            <TemplateCard
              name="list"
              label="Lista"
              description="Componentes de lista de produtos"
              icon="LayoutList"
              defaultValue={data.template}
            />
          </div>
        </div>
        <ProductTemplate />
      </div>
    </div>
  );
}
