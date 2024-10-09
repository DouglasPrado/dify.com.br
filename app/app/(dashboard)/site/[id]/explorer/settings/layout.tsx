import BackButton from "@/components/global/back-button";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SiteSettingsNav from "./nav";

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

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex items-center gap-6">
          <BackButton link={`/site/${params.id}/explorer`} />
          <div className="flex flex-col items-start gap-3 space-y-2 sm:space-y-0">
            <h1 className="w-60 truncate font-title text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
              Configurações explorar
            </h1>
            <h2 className="text-sm text-stone-700">
              Melhore as ideias geradas pela nossa IA baseado em varios itens
            </h2>
          </div>
        </div>
      </div>
      <SiteSettingsNav />
      {children}
    </>
  );
}
