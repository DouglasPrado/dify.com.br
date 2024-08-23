import BlurImage from "../../global/blur-image";

import { placeholderBlurhash } from "@/lib/utils";
import type { Media, Product, Site } from "@prisma/client";
import Image from "next/image";
import { Suspense } from "react";
import BuyProductButton from "../../global/buy-product-button";

interface HeroSectionProps {
  data: Product & { site: Site } & { medias: Media[] };
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col justify-around px-6 pt-6 lg:px-0">
      {/* Logo */}
      <div className="mx-auto max-w-7xl p-3 py-6 lg:mx-0 lg:py-3">
        {data.site.logo ? (
          <Image
            alt={`[${data.site?.logo}]` ?? "Logo "}
            height={130}
            src={data.site.logo}
            width={70}
          />
        ) : (
          <div className="absolute flex h-full w-full select-none items-center justify-center bg-stone-100 text-4xl text-stone-500">
            ?
          </div>
        )}
      </div>

      <div className="flex max-w-7xl flex-col items-center justify-center lg:flex-row lg:items-start lg:gap-10">
        <div className="flex flex-col py-2 lg:hidden">
          <h2 className="animateText font-title text-xs uppercase text-gray-600">
            {data.subTitle}
          </h2>
          <h1 className="animateText bg-clip-text text-2xl font-black">
            {data.title}
          </h1>
          <div
            className="animateText py-4 text-center font-light text-gray-600 lg:hidden"
            dangerouslySetInnerHTML={{
              __html: `${data.shortDescription}`,
            }}
            suppressHydrationWarning={true}
          />
        </div>
        {/* Imagem em destaque */}
        <div className="flex h-full w-full max-w-screen-lg flex-col justify-between gap-6 md:mb-10 md:w-5/6 lg:mb-10 lg:w-1/2">
          <div className="relative m-auto w-full overflow-hidden  md:rounded-2xl">
            <div className="overlay mx-auto flex h-full w-full flex-col items-center justify-center">
              <BlurImage
                alt={`[${data.title}]` ?? "Product image"}
                width={500}
                height={500}
                className="hidden h-full w-full object-contain lg:flex"
                placeholder="blur"
                blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
                src={data.image ?? "/placeholder.png"}
              />
              {/* <SliderMedia data={data} /> */}
              {/* <div className="absolute bottom-0 mb-6 flex w-full items-end justify-center gap-3 lg:justify-end">
                <span className="rounded-2xl bg-white px-6 py-2 font-title text-sm uppercase text-black shadow-lg">
                  🔥 só hoje 🔥
                </span>

                <span className="flex gap-2 rounded-2xl bg-white px-6 py-2 font-title text-sm uppercase text-black shadow-lg">
                  <Leaf size={18} />
                  Frete grátis
                </span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="flex max-w-2xl flex-col items-center justify-around gap-6 text-start lg:items-start">
          <div className="hidden flex-col lg:flex">
            <h2 className="animateText font-title text-xl uppercase text-gray-600">
              {data.subTitle}
            </h2>
            <h1 className="animateText bg-clip-text text-4xl font-black">
              {data.title}
            </h1>
          </div>
          <div
            className="animateText hidden font-light text-gray-600 lg:flex lg:flex-col"
            dangerouslySetInnerHTML={{
              __html: `${data.shortDescription}`,
            }}
            suppressHydrationWarning={true}
          />

          <div className="flex w-full flex-col items-center justify-center lg:items-start lg:justify-start ">
            <Suspense fallback={null}>
              {data && (
                <BuyProductButton
                  data={data}
                  colors={data.colors}
                  price={+data.price!}
                  section="hero_section"
                />
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
