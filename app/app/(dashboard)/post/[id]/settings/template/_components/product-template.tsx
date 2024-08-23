"use client";
import LoadingSpinner from "@/components/form/loading-spinner";
import { Input } from "@/components/ui/input";
import { useSettingsPostStore } from "@/lib/stores/SettingsPostStore";
import { useSiteStore } from "@/lib/stores/SiteStore";
import { useParams } from "next/navigation";
import { FC, ReactElement, useEffect } from "react";
import NextStepButton from "./next-step-button";
import ProductCard from "./product-card";

type ProductTemplateProps = {
  // Prop types here
};

const ProductTemplate: FC<
  ProductTemplateProps
> = ({}: ProductTemplateProps): ReactElement => {
  const { id } = useParams() as { id: string };
  const [products, getProducts, filterProducts] = useSettingsPostStore(
    (state) => [state.products, state.getProducts, state.filterProducts],
  );

  const [siteId] = useSiteStore((state) => [state.siteId]);

  useEffect(() => {
    if (siteId) getProducts(siteId, id);
  }, [siteId, getProducts, id]);

  return (
    <>
      <h3 className="font-cal text-stone-800">
        Selecione um ou mais produtos para complementar seu conteúdo
      </h3>
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {products.map((product, idx: number) => (
            <ProductCard key={`key-product-${idx}`} product={product} />
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
      <NextStepButton />
    </>
  );
};

export default ProductTemplate;
