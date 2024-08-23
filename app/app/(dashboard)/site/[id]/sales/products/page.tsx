import CreateProductButton from "@/app/app/(dashboard)/site/[id]/sales/products/_components/create-product-button";
import prisma from "@/lib/prisma";

export default async function SiteSalesProducts({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.product.findMany({
    where: {
      siteId: decodeURIComponent(params.id),
    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h4 className="w-60 truncate text-xl font-light sm:w-auto sm:text-2xl dark:text-white">
            Produtos
          </h4>
        </div>
        <CreateProductButton />
      </div>
      {data.map((product) => JSON.stringify(product))}
    </>
  );
}
