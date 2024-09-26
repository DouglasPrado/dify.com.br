import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { SourcesForm } from "./_components/sources-form";

export default async function ProductPage({
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
      sources: true,
      site: {
        select: {
          subdomain: true,
        },
      },
    },
  });
  if (!data) {
    notFound();
  }

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-title text-3xl font-bold dark:text-white">
          Links de afiliados
        </h1>
        <span className="text-sm text-stone-600">{data.title}</span>
      </div>
      <div className="flex flex-col space-y-3">
        <SourcesForm product={data} />
      </div>
    </div>
  );
}
