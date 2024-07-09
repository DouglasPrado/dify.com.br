import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";
import PageCard from "./page-card";

export default async function Pages({
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
  const pages = await prisma.page.findMany({
    where: {
      userId: session.user.id as string,
      ...(siteId ? { siteId } : {}),
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      site: true,
    },
    ...(limit ? { take: limit } : {}),
  });

  return pages.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {pages.map((page) => (
        <PageCard key={page.id} data={page} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-title text-4xl">No Pages Yet</h1>
      <Image
        alt="missing page"
        src="https://illustrations.popsy.co/stone/graphic-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        You do not have any pages yet. Create one to get started.
      </p>
    </div>
  );
}
