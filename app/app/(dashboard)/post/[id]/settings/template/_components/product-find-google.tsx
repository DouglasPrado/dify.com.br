"use client";

import LoadingSpinner from "@/components/form/loading-spinner";
import LoadingDots from "@/components/icons/loading-dots";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGoogleShopping } from "@/lib/serper";
import { useSiteStore } from "@/lib/stores/SiteStore";
import Image from "next/image";
import { useCallback, useState } from "react";
import GoogleProductCard from "./google-product-card";

export default function ProductFindGoogle() {
  const [products, setProducts] = useState<null | []>(null);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [siteId] = useSiteStore((state) => [state.siteId]);

  const handleFindGoogle = useCallback(async () => {
    setLoading(true);
    if (query !== "" && siteId) {
      const { shopping } = await getGoogleShopping(query, siteId);
      setProducts(shopping);
    }
    setLoading(false);
  }, [query, siteId]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <h3 className="font-cal text-stone-800">
          Pesquise por um produto no Google e crie produtos rapidamente
        </h3>
      </div>

      <div className="flex w-full items-center gap-2">
        <Input
          type="search"
          disabled={loading}
          placeholder="Pesquisar produtos"
          onChange={(e: any) => setQuery(e.target.value)}
        />
        <Button
          className="w-full max-w-xs border bg-white text-stone-900 hover:bg-stone-50"
          disabled={loading}
          onClick={handleFindGoogle}
        >
          {!loading ? (
            <div className="flex gap-3">
              <Image
                alt="[Google Login]"
                src={"/google.svg"}
                width={0}
                height={0}
                style={{
                  width: "auto",
                  height: "18px",
                }}
              />
              Pesquisar no Google
            </div>
          ) : (
            <LoadingDots />
          )}
        </Button>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
          {products.map((product, idx: number) => (
            <GoogleProductCard
              key={`key-product-google-${product}-${idx}`}
              product={product}
              keyword={query}
            />
          ))}
        </div>
      ) : products && products.length === 0 ? (
        <div className="flex w-full items-center justify-center gap-6 ">
          <span className="text-xs font-light text-stone-500">
            Carregando produtos...
          </span>
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex w-full items-center justify-center gap-6 "></div>
      )}
    </div>
  );
}
