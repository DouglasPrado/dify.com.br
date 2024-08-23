"use client";
import Link from "next/link";
import BlogCard from "../global/blog-card";
import FooterSection from "../sections/products/footer-section";
import NavSection from "../sections/products/nav-section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function BlogPage({ data, collections, categories }: any) {
  return (
    <div className="flex w-full flex-col overflow-x-hidden">
      {/* <CookieSection data={{ site: data }} /> */}
      <div className="mx-auto mb-6 flex w-full flex-col items-start justify-start ">
        {/* Navegação */}
        <NavSection
          logo={{ logo: data.logo, config: data.logoConfig }}
          categories={categories}
        />
        {/* Banner de atração */}
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
                        <h2 className="py-3 font-title text-xl text-stone-800 lg:text-3xl">
                          {collection.name}
                        </h2>
                        <Link
                          className="text-xs text-stone-500 underline hover:text-stone-700 lg:text-sm"
                          href={`/c/${collection.slug}`}
                        >
                          Mostrar tudo
                        </Link>
                      </div>
                      <div>
                        <Carousel className="w-full max-w-xs md:max-w-full">
                          <CarouselContent>
                            {collection?.posts.map(
                              (metadata: any, index: number) => (
                                <CarouselItem
                                  className="py-6 md:basis-1/2 lg:basis-1/4"
                                  key={index}
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
                    </div>
                  </section>
                ),
            )}
          </div>
        </div>
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
