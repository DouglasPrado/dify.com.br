import BlurImage from "../../global/blur-image";

import { cn } from "@/lib/utils";
import type { Media, Product, ProductSections, Site } from "@prisma/client";
import { Star, StarHalf } from "lucide-react";

interface ReviewsSectionProps {
  data: Product & {
    site: Site;
    sections: ProductSections[] & { medias: Media[] };
  };
}

export default function ReviewsSection({ data }: ReviewsSectionProps) {
  return (
    <section className="flex flex-col gap-12 px-6 pt-12 lg:bg-white lg:px-0">
      <h1 className="font-title text-3xl">Quem conhece, recomenda</h1>
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-3">
        {data.sections.map(
          (section: any, idx: number) =>
            section.reference === "reviews" && (
              <div
                key={idx}
                className="flex flex-col items-center justify-center gap-1 rounded-xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-100"
              >
                <h3 className="font-title text-lg">
                  {JSON.parse(section.content).name}
                </h3>
                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-amber-400">
                  {parseFloat(JSON.parse(section.content).stars).toFixed(1)}
                  <Star width={16} />
                  <Star width={16} />
                  <Star width={16} />
                  <Star width={16} />
                  <StarHalf width={16} />
                  {}
                </div>
                <p className="text-sm text-gray-700">
                  {JSON.parse(section.content).comment}
                </p>
                <div className="flex items-center justify-center gap-3">
                  {data.sections.medias?.length > 0
                    ? data.sections.medias?.map((media: any) => (
                        <div
                          key={idx}
                          className="relative inline-block cursor-pointer overflow-hidden rounded-lg align-middle md:h-14 md:w-14"
                        >
                          <BlurImage
                            alt={
                              JSON.parse(section.content).name ?? "User Avatar"
                            }
                            height={80}
                            src={media}
                            width={80}
                          />
                        </div>
                      ))
                    : null}
                </div>
              </div>
            ),
        )}
      </div>
      <div className="mx-auto flex max-w-7xl pb-12">
        <button
          className={cn(
            "max-w-xs rounded-full bg-stone-100 px-12 py-2 font-title text-lg text-black hover:underline",
          )}
        >
          <p>Ver mais avaliações</p>
        </button>
      </div>
    </section>
  );
}
