import Columnists from "@/app/app/(dashboard)/site/[id]/contents/columnists/_components/columnists";
import CreateColumnistButton from "@/app/app/(dashboard)/site/[id]/contents/columnists/_components/create-columnist-button";
import BackButton from "@/components/global/back-button";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function SiteColumnists({
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
  });

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const url = data.customDomain
    ? `https://${data.customDomain}`
    : `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="grid grid-cols-1 items-center justify-start gap-6 lg:flex lg:flex-row">
          <BackButton />
          <div className="flex flex-col">
            <h1 className="font-title text-2xl">Todos os colunistas</h1>
            <p className="flex">Listagem e acompanhamento dos colunistas</p>
          </div>
        </div>
        <CreateColumnistButton />
      </div>
      <Columnists siteId={data.id} />
    </>
  );
}
