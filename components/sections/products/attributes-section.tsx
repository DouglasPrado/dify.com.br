import { Suspense } from "react";
import BlurImage from "../../global/blur-image";

import type { Product, ProductSections, Site } from "@prisma/client";
import BuyProductButton from "../../global/buy-product-button";

interface AttributesSectionProps {
  data: Product & { site: Site; sections: ProductSections[] };
}

export default function AttributesSection({ data }: AttributesSectionProps) {
  return (
    <section className="mx-auto flex flex-col items-center justify-center gap-12 py-12 lg:bg-gray-50">
      <h1 className="font-title text-3xl">Modelos dísponiveis</h1>
      <div className="flex flex-col items-center justify-center gap-12 lg:flex-row">
        {data.sections.map(
          (section: any, idx: number) =>
            section.reference === "attribute" && (
              <div
                key={idx}
                className="flex cursor-pointer flex-col items-center gap-4 rounded-lg border border-white bg-white px-4  py-12 shadow-xl shadow-gray-100 hover:border-stone-400"
              >
                {JSON.parse(section.content).image ? (
                  <div
                    key={idx}
                    className="relative inline-block cursor-pointer overflow-hidden rounded-lg align-middle md:h-40 md:w-40"
                  >
                    <BlurImage
                      alt={JSON.parse(section.content).image ?? "User Avatar"}
                      height={250}
                      src={JSON.parse(section.content).image}
                      width={250}
                    />
                  </div>
                ) : (
                  <div className="absolute flex h-full w-full select-none items-center justify-center bg-stone-100 text-4xl text-stone-500">
                    ?
                  </div>
                )}
                <div className="flex max-w-[360px] flex-col items-center justify-center gap-6 ">
                  <h3 className="font-semibold">
                    {JSON.parse(section.content).title}
                  </h3>
                  <div
                    className="text-sm text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: `${JSON.parse(section.content).list}`,
                    }}
                  />
                </div>
                {data.productId && (
                  <Suspense fallback={null}>
                    {data && (
                      <BuyProductButton
                        data={data}
                        colors={data.colors}
                        price={+data.price!}
                        section="attributes_section"
                      />
                    )}
                  </Suspense>
                )}
              </div>
            ),
        )}
      </div>
    </section>
  );
}
