import ClusterCard from "@/app/app/(dashboard)/site/[id]/clusters/_components/cluster-card";
import OverviewClustersCTA from "@/app/app/(dashboard)/site/[id]/clusters/_components/overview-clusters-cta";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ProductCampaign({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const clusters = await prisma.whitelist.findMany({
    where: {
      ref: decodeURIComponent(params.id),
    },
    include: {
      leads: true,
      site: true,
    },
  });

  const product = await prisma.product.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  if (!clusters) {
    notFound();
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex items-center justify-between space-y-6">
        <h1 className="font-title text-3xl font-bold dark:text-white">
          Campanhas de rastreamento e clusterização
        </h1>
        <Suspense fallback={null}>
          <OverviewClustersCTA />
        </Suspense>
      </div>
      <div className="flex flex-col gap-6">
        {product &&
          clusters.map((cluster, idxCluster) => (
            <ClusterCard
              data={cluster}
              key={`key-cluster-${idxCluster}`}
              productURL={`${product.url}`}
            />
          ))}
      </div>
    </div>
  );
}
