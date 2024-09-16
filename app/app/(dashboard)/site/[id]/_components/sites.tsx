import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";
import SiteCard from "./site-card";

export default async function Sites({ limit }: { limit?: number }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const sites = await prisma.site.findMany({
    where: {
      user: {
        id: session.user.id as string,
      },
    },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    ...(limit ? { take: limit } : {}),
  });

  return sites.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {sites.map((site: any) => (
        <SiteCard key={site.id} data={site} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4 pt-20">
      <h1 className="font-title text-4xl">Não tem projetos ainda.</h1>
      <Image
        alt="[Negócio não encontrado.]"
        src="/business.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        Você ainda não tem nenhum projeto. Crie um para começar.
      </p>
    </div>
  );
}
