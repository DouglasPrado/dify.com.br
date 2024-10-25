import Steps from "@/components/global/steps";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import FontCard from "./_components/font-card";
import FormKnowledge from "./_components/form-knowledge";
import NextStepButton from "./_components/next-step-button";
import TableKnowledge from "./_components/table-knowledge";

export default async function PostSettingsKnowledge({
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
    include: { knowledges: true },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-start gap-3 space-y-2 sm:space-y-0">
          <h1 className="w-60 truncate font-title text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
            Conhecimento
          </h1>
          <h2 className="text-sm text-stone-700">
            Crie uma base de conhecimento para ganhar potência de inteligencia e
            criar conteúdos autenticos.
          </h2>
          <Steps
            steps={[
              { index: "01", name: "Template", selected: false },
              { index: "02", name: "Conhecimento", selected: true },
              { index: "03", name: "SEO", selected: false },
            ]}
          />
        </div>
      </div>
      <div className="">
        <h2 className="font-cal text-stone-800">Escolher fonte de dados</h2>
        <div className="my-3 grid grid-cols-1 gap-3 xl:grid-cols-3">
          <FontCard
            name="text"
            label="Texto"
            description="Envie textos"
            icon="Text"
          />
          <FontCard
            label="Youtube"
            name="youtube"
            description="Envie links do youtube"
            icon="Youtube"
          />
          <FontCard
            label="Link"
            name="url"
            description="Envie links de sites"
            icon="Link2"
          />
          {/* <FontCard
            label="PDF"
            name="pdf"
            description="Envie PDF's"
            icon="FileText"
          />
          <FontCard
            label="Sitemaps"
            name="sitemap"
            description="Envie Sitemaps de sites"
            icon="Rss"
          /> */}
        </div>
      </div>
      <FormKnowledge />
      <TableKnowledge data={data} />
      <NextStepButton />
    </div>
  );
}
