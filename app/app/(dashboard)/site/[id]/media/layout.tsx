import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";
import CollectionNav from "./nav";

export default async function SiteAnalyticsLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
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
      <div className="flex w-full flex-col items-center space-x-4 space-y-2 sm:flex-row sm:space-y-0">
        <div className="flex w-full flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <h4 className="w-60 truncate text-xl font-light sm:w-auto sm:text-2xl dark:text-white">
              Galeria de Arquivos
            </h4>
          </div>
        </div>
      </div>
      <CollectionNav />
      {children}
    </>
  );
}
