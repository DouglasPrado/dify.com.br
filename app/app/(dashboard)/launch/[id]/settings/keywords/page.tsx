import Steps from "@/components/global/steps";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { KeywordsForm } from "./_components/keywords-form";

export default async function SettingsKeywords({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.launch.findUnique({
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
        <div className="flex flex-col gap-1">
          <h2 className="font-cal text-3xl font-bold dark:text-white">
            Configurações do conteúdo
          </h2>
          <h3 className="text-sm font-light text-stone-700">
            Pense em cada lançamento como silos para organizar seu conteúdo.
          </h3>
        </div>
        <Steps
          steps={[
            { index: "01", name: "Palavras-chave", selected: true },
            { index: "02", name: "Conhecimento", selected: false },
            { index: "03", name: "SEO", selected: false },
          ]}
        />
        <div className="flex flex-col">
          <h2 className="font-cal text-stone-800">Direcione o seu conteúdo.</h2>
        </div>
        <KeywordsForm launch={data} />
      </div>
    </div>
  );
}
