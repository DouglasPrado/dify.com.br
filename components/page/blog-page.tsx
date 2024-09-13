"use client";
import Link from "next/link";
import BlogCard from "../global/blog-card";
import CookieSection from "../sections/products/cookie-section";
import FooterSection from "../sections/products/footer-section";
import NavSection from "../sections/products/nav-section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function BlogPage({
  data,
  collections,
  categories,
  carrousel = false,
}: any) {
  return (
    <div className="flex w-full flex-col overflow-x-hidden">
      <CookieSection data={{ site: data }} />
      <div className="mx-auto mb-6 flex w-full flex-col items-start justify-start ">
        {/* Navegação */}
        <NavSection
          name={data.name}
          logo={{ logo: data.logo, config: data.logoConfig }}
          categories={categories}
        />
        {/* Banner de atração */}
        {data.homeTitle && (
          <div className="flex w-full flex-col items-center justify-center gap-6 bg-stone-50 px-6 py-24">
            <h1 className="font-cal text-4xl sm:text-6xl">{data.homeTitle}</h1>
            <p className="text-lg text-stone-600 sm:text-xl">
              {data.homeSubtitle}
            </p>
          </div>
        )}
        <div className="flex max-w-7xl flex-col gap-6 px-6 md:mx-auto">
          {/* COLUNA PRINCIPAL */}
          <div className="flex w-full flex-col items-start">
            {/* Conteúdo */}
            {collections?.map(
              (collection: any, idx: number) =>
                collection?.posts.length > 1 && (
                  <section
                    key={`key-collection-name-${idx}`}
                    className=" flex-title mx-auto flex w-full justify-around gap-6 px-3 pt-6 lg:flex-row lg:px-0"
                  >
                    <div className="max-w-screen-xl 2xl:mx-auto">
                      <div className="flex items-center justify-between">
                        <h2 className="py-3 font-title text-xl capitalize text-stone-800 lg:text-3xl">
                          {collection.name}
                        </h2>
                        <Link
                          className="text-xs text-stone-500 underline hover:text-stone-700 lg:text-sm"
                          href={`/c/${collection.slug}`}
                        >
                          Mostrar tudo
                        </Link>
                      </div>
                      {carrousel ? (
                        <div>
                          <Carousel className="w-full max-w-xs md:max-w-full">
                            <CarouselContent>
                              {collection?.posts.map(
                                (metadata: any, index: number) => (
                                  <CarouselItem
                                    className="py-6 md:basis-1/2 lg:basis-1/4"
                                    key={`key-carousel-item-${index}`}
                                  >
                                    <BlogCard data={metadata} />
                                  </CarouselItem>
                                ),
                              )}
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex" />
                            <CarouselNext className="hidden md:flex" />
                          </Carousel>
                        </div>
                      ) : (
                        <div className="grid w-full max-w-xs grid-cols-1 gap-6 sm:grid-cols-4 md:max-w-full">
                          {collection?.posts.map(
                            (metadata: any, index: number) => (
                              <div
                                className="py-6 "
                                key={`key-carousel-item-${index}`}
                              >
                                <BlogCard data={metadata} />
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </section>
                ),
            )}
          </div>
        </div>
        {data.homeContent && (
          <div
            className="prose-md prose-sm prose-stone m-auto mx-auto max-w-7xl py-12 text-[18px] text-stone-800/95 sm:prose-lg dark:prose-invert  prose-h2:font-cal prose-h2:text-[40px] prose-h2:text-stone-950 prose-h3:font-cal prose-h3:text-[30px] prose-h3:text-stone-950 sm:text-[21px]"
            dangerouslySetInnerHTML={{ __html: `${data.homeContent}` }}
          />
        )}
      </div>
      <FooterSection
        data={{
          colors: {
            backgroundFooter: data.colors["backgroundFooter"],
            colorContrastFooter: data.colors["colorContrastFooter"],
          },
          site: data,
        }}
      />
    </div>
  );
}
