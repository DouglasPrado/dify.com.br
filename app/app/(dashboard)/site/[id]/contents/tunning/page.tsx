import BackButton from "@/components/global/back-button";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { SlidersVertical } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import CreateTunningButton from "./_components/create-tunning-button";
import Tunnings from "./_components/tunnings";

export default async function SiteContentTunning({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    select: { id: true, userId: true },
  });

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="grid grid-cols-1 items-center justify-start gap-6 lg:flex lg:flex-row">
          <BackButton />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <SlidersVertical />
              <h1 className="font-title text-2xl">Fine Tunning</h1>
            </div>
            <p className="flex">
              Mascara de estrutura para construção de conteúdo
            </p>
          </div>
        </div>

        <CreateTunningButton />
      </div>
      <Tunnings siteId={data.id} />
    </>
  );
}
