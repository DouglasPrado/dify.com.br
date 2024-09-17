import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Lead, Site, Whitelist } from "@prisma/client";
import Image from "next/image";
import { redirect } from "next/navigation";
import ClusterCard from "./cluster-card";

export default async function Clusters({
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
  const clusters = await prisma.whitelist.findMany({
    where: {
      ...(siteId ? { siteId } : {}),
    },
    include: {
      leads: true,
      site: true,
    },
    ...(limit ? { take: limit } : {}),
  });

  return clusters.length > 0 ? (
    <div className="flex flex-col gap-6">
      {clusters.map(
        (
          cluster: Whitelist & { leads: Lead[]; site: Site },
          idxCluster: number,
        ) => (
          <ClusterCard key={`key-cluster-card-${idxCluster}`} data={cluster} />
        ),
      )}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-title text-4xl">Você não tem nenhum conteúdo</h1>
      <Image
        alt="missing post"
        src="https://illustrations.popsy.co/gray/crashed-error.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        Você ainda não tem lista de contatos. Crie um produto para começar.
      </p>
    </div>
  );
}
