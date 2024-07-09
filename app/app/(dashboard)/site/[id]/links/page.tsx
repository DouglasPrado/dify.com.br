import CreateLinkButton from "@/app/app/(dashboard)/site/[id]/links/_components/create-link-button";
import LinkCard from "@/app/app/(dashboard)/site/[id]/links/_components/link-card";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function SiteLinks({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.link.findMany({
    where: {
      siteId: decodeURIComponent(params.id),
    },
    include: {
      site: {
        select: {
          customDomain: true,
          subdomain: true,
        },
      },
    },
  });

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-start gap-3 space-y-2 sm:space-y-0">
          <h1 className="w-60 truncate font-title text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
            Links para Home
          </h1>
          <h2 className="text-sm text-slate-700">
            Todos os seus links em um único lugar, sem gastar nada!
          </h2>
        </div>
        <CreateLinkButton />
      </div>
      {data.map((link, idxLink) => (
        <LinkCard key={`key-link-${idxLink}`} data={link} />
      ))}
    </>
  );
}
