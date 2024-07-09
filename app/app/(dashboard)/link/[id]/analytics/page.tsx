import AnalyticsMockup from "@/components/global/analytics";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function LinkAnalytics({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.link.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });
  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center justify-center p-6 sm:justify-start lg:p-10">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-title text-xl font-bold sm:text-3xl dark:text-white">
            Análise do link rápido personalizável
          </h1>
        </div>
      </div>
      <div className="w-full max-w-7xl">
        <AnalyticsMockup />
      </div>
    </>
  );
}
