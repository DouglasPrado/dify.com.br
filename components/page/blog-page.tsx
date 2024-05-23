"use client";
import { GoogleTagManager } from "@next/third-parties/google";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect } from "react";
import BlogCard from "../global/blog-card";
import BlurImage from "../global/blur-image";
import BlogAboutSection from "../sections/blog/about-section";
import BlogColumnistsSection from "../sections/blog/columnists-section";
import BlogHeroSection from "../sections/blog/hero-section";
import BlogSecondSection from "../sections/blog/second-section";
import FooterSection from "../sections/products/footer-section";
import NavSection from "../sections/products/nav-section";

export default function BlogPage({
  data,
  collections,
  postsHightLights,
  posts,
  products,
  columnists,
}: any) {
  const { setTheme } = useTheme();
  useEffect(() => setTheme(data?.metadata?.theme));
  return (
    <>
      {/* <CookieSection data={{ site: data }} /> */}
      <div className="mx-auto mb-6 flex w-full flex-col items-center justify-center">
        {/* Navegação */}
        <NavSection logo={data.logo} collections={collections} />
        {/* Banner de atração */}
        <div className="mx-auto flex max-w-7xl flex-col gap-6 ">
          {/* COLUNA PRINCIPAL */}
          <div className="">
            <section className="mx-auto flex w-full gap-6 p-6 lg:px-0">
              {postsHightLights.length > 0 && (
                <BlogHeroSection data={postsHightLights[0]} />
              )}
            </section>
            <section className="mx-auto flex w-full gap-6 p-3 pt-6 lg:px-0">
              {postsHightLights.length > 0 && (
                <BlogSecondSection data={postsHightLights} />
              )}
            </section>
            <section className=" mx-auto flex w-full flex-col justify-around gap-6 px-3 pt-6 lg:flex-row lg:px-0">
              {/* Conteúdo */}
              {posts.length > 0 && (
                <div className="max-w-screen-xl py-3 2xl:mx-auto">
                  <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
                    {posts.map((metadata: any, index: number) =>
                      index === 6 ? (
                        <BlogAboutSection
                          key={`about-section-${index}`}
                          data={data}
                        />
                      ) : index === 17 ? (
                        <BlogColumnistsSection
                          key={`columnist-section-${index}`}
                          data={columnists}
                        />
                      ) : (
                        <BlogCard key={index} data={metadata} />
                      ),
                    )}
                    {products.length > 0 &&
                      products.map((product: any, idxProduct: number) => (
                        <Link
                          key={idxProduct}
                          href={`/product/${product.url}`}
                          className=""
                        >
                          <div className="ease h-full overflow-hidden rounded-2xl border-2 border-stone-100 bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-stone-800">
                            <AspectRatio ratio={16 / 9} className="bg-muted">
                              <BlurImage
                                src={product.image!}
                                alt={product.title ?? "Product Post"}
                                width={500}
                                height={400}
                                className="h-64 w-full object-contain"
                                placeholder="blur"
                                blurDataURL={product.imageBlurhash}
                              />
                            </AspectRatio>
                            <div className=" border-t border-stone-200 px-5 py-6 dark:border-stone-700 dark:bg-black">
                              <h3 className="text-md font-title tracking-wide dark:text-white">
                                {product.title}
                              </h3>
                              <p className="line-clamp-3 text-sm italic text-stone-600 xl:line-clamp-2 dark:text-stone-400">
                                {product.shortDescription}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </section>

            {/* Produtos */}
            <section className="mx-auto flex w-full flex-col justify-around px-6 py-3 lg:px-0">
              <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:grid-cols-3"></div>
            </section>
          </div>
          {/* COLUNA LATERAL */}
          <div className="col-span-1 gap-12">
            {/* SOBRE O SITE */}

            {/* COLEÇÔES */}

            {/* TRENDING */}
            <div className="relative my-12 w-full overflow-y-auto rounded-xl border border-stone-100 px-6 shadow-md transition-all hover:shadow-xl "></div>

            {/* CLOUD */}

            {/* NEWSLETTER */}

            {/* WEBSTORIES */}
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
      <GoogleTagManager gtmId={data.gaGTMId} />
    </>
  );
}
