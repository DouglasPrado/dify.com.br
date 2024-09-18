import prisma from "@/lib/prisma";
import Image from "next/image";
import OverviewBulkProductCTA from "./_components/overview-bulk-product-cta";
import OverviewProductCTA from "./_components/overview-product-cta";
import ProductCard from "./_components/product-card";

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
        <div className="flex gap-6">
          <OverviewBulkProductCTA
            title="Adicionar produto em massa"
            type="product"
          />
          <OverviewProductCTA title="Adicionar produto" type="product" />
        </div>
      </div>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.map((product: any) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center space-x-4">
          <Image
            alt="missing post"
            src="https://illustrations.popsy.co/gray/crashed-error.svg"
            width={400}
            height={400}
          />
          <h1 className="font-title text-4xl">Você não tem nenhum produto</h1>

          <p className="text-lg text-stone-500">
            Você ainda não tem produto. Crie um para começar.
          </p>
        </div>
      )}
    </>
  );
}
