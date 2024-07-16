import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";
import TunningCard from "./tunning-card";

export default async function Tunnings({
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
  const tunnings = await prisma.contentFineTunning.findMany({
    where: {
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

  return tunnings.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 py-3">
      {tunnings.map((tunning) => (
        <TunningCard key={tunning.id} data={tunning} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-title text-4xl">Você não tem nenhum fine Tunning</h1>
      <Image alt="missing post" src="/content.svg" width={400} height={400} />
      <p className="text-lg text-stone-500">
        Você ainda não tem conteúdo. Crie um para começar.
      </p>
    </div>
  );
}
