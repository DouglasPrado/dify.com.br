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
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <SlidersVertical />
          <h1 className="w-60 truncate font-title text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
            Fine Tunning
          </h1>
        </div>
        <CreateTunningButton />
      </div>
      <Tunnings />
    </>
  );
}
