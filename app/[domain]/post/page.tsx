import BlogCard from "@/components/global/blog-card";
import BlurImage from "@/components/global/blur-image";
import BlogAboutSection from "@/components/sections/blog/about-section";
import BlogColumnistsSection from "@/components/sections/blog/columnists-section";
import BlogHeroSection from "@/components/sections/blog/hero-section";
import BlogSecondSection from "@/components/sections/blog/second-section";
import FooterSection from "@/components/sections/products/footer-section";
import NavSection from "@/components/sections/products/nav-section";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  getCategoriesForSite,
  getColumnistForSite,
  getPostsForSite,
  getPostsHighLightForSite,
  getProductsForSite,
  getSiteData,
} from "@/lib/fetchers";
import prisma from "@/lib/prisma";
import { GoogleTagManager } from "@next/third-parties/google";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const allSites = await prisma.site.findMany({
    select: {
      subdomain: true,
      customDomain: true,
    },
    // feel free to remove this filter if you want to generate paths for all sites
    where: {
      subdomain: "demo",
    },
  });

  const allPaths = allSites
    .flatMap(({ subdomain, customDomain }) => [
      subdomain && {
        domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      },
      customDomain && {
        domain: customDomain,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const [data, posts, postsHightLights, products, categories, columnists]: any =
    await Promise.all([
      getSiteData(domain),
      getPostsForSite(domain),
      getPostsHighLightForSite(domain),
      getProductsForSite(domain),
      getCategoriesForSite(domain),
      getColumnistForSite(domain),
    ]);

  if (!data) {
    notFound();
  }

  return (
    <>
      {/* <CookieSection data={{ site: data }} /> */}
      <div className="mx-auto mb-6 flex w-full flex-col items-center justify-center">
        {/* Navegação */}
        <NavSection
          logo={{ logo: data.logo, config: data.logoConfig }}
          categories={categories}
        />
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
                        <BlogCard key={`key-post-card-${index}`} data={metadata} />
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
    </>
  );
}
