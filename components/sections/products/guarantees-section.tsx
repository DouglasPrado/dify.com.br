import BlurImage from "../../global/blur-image";

import type { Media, Product, ProductSections, Site } from "@prisma/client";

interface GuaranteesSectionProps {
  data: Product & {
    site: Site;
    sections: ProductSections[] & { medias: Media[] };
  };
}

export default function GuaranteesSection({ data }: GuaranteesSectionProps) {
  return (
    <section className="mx-auto flex flex-col gap-6 bg-slate-50 px-6 py-16 lg:px-0">
      {data.sections.map(
        (section: any, idx: number) =>
          section.reference === "guarantee" && (
            <div
              key={`key-section-${idx}`}
              className="mx-auto flex max-w-7xl items-center justify-center gap-24"
            >
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="relative inline-block w-40 overflow-hidden rounded-full align-middle">
                  <BlurImage
                    alt={"Garantia IMG"}
                    height={280}
                    src={
                      "https://i1.wp.com/clickdenegocios.com.br/wp-content/uploads/2017/12/selo-satisfacao-garantida.png?fit=204%2C211&ssl=1"
                    }
                    width={280}
                  />
                </div>
                <h2 className="font-title text-3xl text-slate-800">
                  {JSON.parse(section.content).title}
                </h2>
                <h3 className="font-light text-gray-700">
                  {JSON.parse(section.content).description}
                </h3>
              </div>
            </div>
          ),
      )}
    </section>
  );
}
