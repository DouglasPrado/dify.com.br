import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Launch } from "@prisma/client";
import { redirect } from "next/navigation";
import LaunchCard from "./launch-card";

export default async function Launches({
  siteId,
  limit,
}: {
  siteId?: string;
  limit?: number;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  const launches = await prisma.launch.findMany({
    where: {
      ...(siteId ? { siteId } : {}),
    },
    orderBy: [
      {
        createdAt: "asc",
      },
    ],
    include: {
      site: true,
    },
    ...(limit ? { take: limit } : {}),
  });

  return (
    <div className="flex w-full flex-col gap-6 pt-6">
      <div className="flex flex-col gap-4">
        {launches.map((launch: Launch, idxLaunch: number) => (
          <LaunchCard key={`key-planning-launch-${idxLaunch}`} data={launch} />
        ))}
      </div>
    </div>
  );
}
