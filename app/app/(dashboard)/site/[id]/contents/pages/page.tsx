import CreatePageButton from "@/app/app/(dashboard)/site/[id]/contents/pages/_components/create-page-button";
import Pages from "@/app/app/(dashboard)/site/[id]/contents/pages/_components/pages";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function SitePages({
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

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="w-60 truncate font-cal text-xl font-bold dark:text-white sm:w-auto sm:text-3xl">
            Todos as páginas da {data.name}
          </h1>
          
        </div>
        <CreatePageButton />
      </div>
      <Pages siteId={decodeURIComponent(params.id)} />
    </>
  );
}
