import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { FeatureForm } from "./_components/feature-form";
import SyncTemplateProduct from "../settings/_components/template-sync";

export default async function ProductFeatures({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.product.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      features: true,
    },
  });
  if (!data) {
    notFound();
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col justify-between space-y-6 sm:flex-row">
        <div className="flex flex-col gap-2">
          <h1 className="font-title text-3xl font-bold dark:text-white">
            Especificações técnicas
          </h1>
          <span className="text-sm text-stone-600">{data.title}</span>
        </div>
       
      </div>

      <FeatureForm product={data} />
    </div>
  );
}
