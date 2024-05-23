import Medias from "@/app/app/(dashboard)/site/[id]/medias/_components/medias";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function SiteContacts({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data: any = await prisma.media.findMany({
    where: {
      siteId: decodeURIComponent(params.id),
    },
    include: {
      site: true,
    },
  });

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col justify-between gap-6 space-y-4 sm:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="w-60 truncate font-cal text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
            Galerias de mídias
          </h1>
        </div>
        <Medias medias={data} />
      </div>
    </>
  );
}
