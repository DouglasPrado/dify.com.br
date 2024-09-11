import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { SEOForm } from "./_components/seo-form";
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
        <div className="flex gap-1 flex-col">
          <h2 className="font-cal text-3xl font-bold dark:text-white">
            Configurações do conteúdo
          </h2>
          <h3 className="text-sm font-light text-stone-700">{data.title}</h3>
        </div>
        <Steps
          steps={[
            { index: "01", name: "Template", selected: false },
            { index: "02", name: "Conhecimento", selected: false },
            { index: "03", name: "SEO", selected: true },
          ]}
        />
        <div className="flex flex-col">
          <h2 className="font-cal text-stone-800">Direcione o seu conteúdo.</h2>
          <SEOForm post={data} />
        </div>
      </div>
    </div>
  );
}
