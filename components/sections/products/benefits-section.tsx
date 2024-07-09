"use client";
import BlurImage from "../../global/blur-image";

import { cn } from "@/lib/utils";
import type { Media, Product, ProductSections, Site } from "@prisma/client";
import { Suspense, useState } from "react";
import BuyProductButton from "../../global/buy-product-button";
import VideoCard from "../../global/video-card";

interface BenefitsSectionProps {
  data: Product & { site: Site; sections: ProductSections[]; medias: Media[] };
}

export default function BenefitsSection({ data }: BenefitsSectionProps) {
  const [showImage, setShowImage] = useState(null);

  return (
    <section className="flex flex-col items-center gap-12 bg-white px-6 py-12 lg:px-0">
      <h1 className="max-w-3xl font-title text-xl lg:text-3xl">
        {data.titleBenefits}
      </h1>
      <div className="flex flex-col items-center justify-center lg:max-w-2xl lg:gap-12">
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-black lg:max-h-96 ">
          {!showImage ? (
            data.videoThumbnail &&
            data.video && (
              <VideoCard
                code={data.video.split("?v=")[1]}
                thumbnail={data.videoThumbnail}
              />
            )
          ) : (
            <BlurImage
              alt={showImage ?? "User Avatar"}
              width="760"
              height="415"
              src={showImage}
              className="h-full w-full rounded-lg object-fill "
            />
          )}
        </div>

        <div className="grid grid-cols-2 items-center justify-between gap-6 py-6 lg:flex lg:flex-row ">
          {data.medias!.map((media: any, idx: number) => (
            <div
              key={idx}
              onClick={() => setShowImage(media.slug)}
              className={cn(
                media.slug === showImage ? "border p-0.5" : "",
                "relative inline-block cursor-pointer overflow-hidden rounded-lg bg-white align-middle md:h-32 md:w-32",
              )}
            >
              {media ? (
                <BlurImage
                  alt={media.slug ?? "User Avatar"}
                  height={250}
                  src={media.slug}
                  width={250}
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <div className="absolute flex h-full w-full select-none items-center justify-center bg-stone-100 text-4xl text-stone-500">
                  ?
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-36 lg:px-12 lg:pb-12 lg:pt-24">
        {data.sections.map(
          (section: any, idx: number) =>
            section.reference === "benefits" && (
              <div key={idx} className="flex items-center">
                <div className="flex max-w-[360px] flex-col items-center justify-center gap-3 ">
                  <h3 className="text-center font-title text-gray-800">
                    {JSON.parse(section.content).title}
                  </h3>
                  <p className="text-center text-sm text-gray-600">
                    {JSON.parse(section.content).description}
                  </p>
                </div>
              </div>
            ),
        )}
      </div>

      {data.productId && (
        <Suspense fallback={null}>
          {data && (
            <BuyProductButton
              data={data}
              colors={data.colors}
              price={+data.price!}
              section="benefits_section"
            />
          )}
        </Suspense>
      )}
    </section>
  );
}
