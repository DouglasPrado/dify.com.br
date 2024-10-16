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

export default function Blog404Page({
  data,
  collections,
  categories,
  carrousel = false,
}: any) {
  return (
    <div className="flex w-full flex-col overflow-x-hidden">
      <div className="mx-auto mb-6 flex w-full flex-col items-start justify-start ">
        <NavSection
          name={data.name}
          logo={{ logo: data.logo, config: data.logoConfig }}
          categories={categories}
        />
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <div className="flex flex-col pt-12">
            <h1 className="font-cal text-3xl">
              O que você está procurando não foi encontrado!
            </h1>
            <p>
              Abaixo temos algumas sugestões baseado na sua pesquisa para ajudar
              você a encontrar o que procura.
            </p>
          </div>
          {/* COLUNA PRINCIPAL */}
          <div className="flex w-full flex-col items-start">
            {/* Conteúdo */}
            {collections?.map(
              (collection: any, idx: number) =>
                collection?.posts.length > 1 && (
                  <section
                    key={`key-collection-name-${idx}`}
                    className="flex-title mx-auto flex w-full justify-around gap-6 px-6 pt-6 lg:flex-row lg:px-0"
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
                        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-4 md:max-w-full">
                          {collection?.posts.map(
                            (metadata: any, index: number) => (
                              <div
                                className=""
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
