"use client";
import LoadingSpinner from "@/components/form/loading-spinner";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettingsPostStore } from "@/lib/stores/SettingsPostStore";
import { useSiteStore } from "@/lib/stores/SiteStore";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FC, ReactElement, useEffect, useState } from "react";
import NextStepButton from "./next-step-button";
import ProductCard from "./product-card";
import ProductFindGoogle from "./product-find-google";

type ProductTemplateProps = {
  // Prop types here
};

const ProductTemplate: FC<
  ProductTemplateProps
> = ({}: ProductTemplateProps): ReactElement => {
  const { id } = useParams() as { id: string };
  const [tab, setTab] = useState("products");
  const [products, getProducts, filterProducts] = useSettingsPostStore(
    (state) => [state.products, state.getProducts, state.filterProducts],
  );
  const [siteId] = useSiteStore((state) => [state.siteId]);

  useEffect(() => {
    if (siteId) getProducts(siteId, id);
  }, [siteId, getProducts, id, tab]);

  return (
    <div className="flex w-full flex-col gap-3">
      <Tabs
        onValueChange={(value) => setTab(value)}
        defaultValue="products"
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="products">Selecionar Produtos</TabsTrigger>
          <TabsTrigger value="google">
            <div className="flex gap-3">
              <Image
                alt="[Google Search Shopping]"
                src={"/google.svg"}
                width={0}
                height={0}
                style={{
                  width: "auto",
                  height: "18px",
                }}
              />
              Pesquisar produtos no Google
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center justify-between">
              <h3 className="font-cal text-stone-800">
                Selecione um ou mais produtos para complementar seu conteúdo
              </h3>
            </div>

            <div className="flex w-full items-center gap-2">
              <Input
                type="search"
                placeholder="Pesquisar produtos"
                onChange={(e) => {
                  e.target.value === ""
                    ? siteId && getProducts(siteId, id)
                    : filterProducts(e.target.value);
                }}
              />
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product, idx: number) => (
                  <ProductCard
                    key={`key-product-card-${product.id}-${idx}`}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="flex w-full items-center justify-center gap-6 ">
                <span className="text-xs font-light text-stone-500">
                  Carregando produtos...
                </span>
                <LoadingSpinner />
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="google">
          <ProductFindGoogle />
        </TabsContent>
      </Tabs>

      <NextStepButton />
    </div>
  );
};

export default ProductTemplate;
