import BlogCard from "@/components/global/blog-card";
import MDX from "@/components/global/mdx";
import CookieSection from "@/components/sections/products/cookie-section";
import FooterSection from "@/components/sections/products/footer-section";
import NavSection from "@/components/sections/products/nav-section";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  getCategoriesForSite,
  getCollectionData,
  getSiteData,
} from "@/lib/fetchers";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
export async function generateMetadata({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);

  const [data, siteData] = await Promise.all([
    getCollectionData(domain, slug),
    getSiteData(domain),
  ]);
  if (!data || !siteData) {
    return null;
  }
  const { name, description } = data;

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      creator: "@dify",
    },
    icons: [siteData.favicon],
    // Optional: Set canonical URL to custom domain if it exists
    ...(siteData.customDomain && {
      alternates: {
        canonical: `https://${siteData.customDomain}/c/${params.slug}`,
      },
    }),
  };
}

export async function generateStaticParams() {
  const allCollections = await prisma.collection.findMany({
    select: {
      slug: true,
      site: {
        select: {
          subdomain: true,
          customDomain: true,
        },
      },
    },
  });

  const allPaths = allCollections
    .flatMap(({ site, slug }: any) => [
      site?.subdomain && {
        domain: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        slug,
      },
      site?.customDomain && {
        domain: site.customDomain,
        slug,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

export default async function SiteCollectionPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);

  const [data, categories]: any = await Promise.all([
    getCollectionData(domain, slug),
    getCategoriesForSite(domain),
  ]);

  if (!data) {
    notFound();
  }
  return (
    <>
      <CookieSection data={{ site: data.site }} />
      <div className="mx-auto mb-6 flex w-full flex-col items-center justify-center">
        {/* Navegação */}
        <NavSection
          name={data.site.name}
          logo={{ logo: data.site.logo, config: data.site.logoConfig }}
          categories={categories}
        />
        <section className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-6 px-6 py-6  lg:grid-cols-2 lg:px-0">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Vídeo</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Texto para vídeo</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </section>
        {/* Banner de atração */}
        <section className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-6 px-6 py-12  lg:grid-cols-2 lg:px-0">
          <h1 className="font-title text-4xl">{data?.longName}</h1>
          <p className="text-left font-light text-gray-700">
            {data?.description}
          </p>
        </section>
        <section className="mx-auto grid w-full max-w-7xl grid-cols-1 flex-col justify-around gap-6 px-6 py-12  lg:grid-cols-2 lg:px-0">
          {data?.posts[0] && (
            <div className={`relative h-96 w-full rounded-xl`}>
              <Image
                src={data.posts[0].image!}
                alt={""}
                width={500}
                height={500}
                className="h-full w-full rounded-xl object-cover"
              />
              <div className="to absolute bottom-0 w-full rounded-xl bg-gradient-to-t from-gray-700/80 px-4 py-3">
                <h2 className="line-clamp-1 text-4xl font-semibold text-white drop-shadow">
                  {data.posts[0].title!}
                </h2>
                <p className="line-clamp-2 text-gray-200 drop-shadow">
                  {data.posts[0].description!}
                </p>
              </div>
            </div>
          )}
          {data?.posts[1] && (
            <div className={`relative h-96 w-full rounded-xl`}>
              <Image
                src={data.posts[1].image!}
                alt={""}
                width={500}
                height={500}
                className="h-full w-full rounded-xl object-cover"
              />
              <div className="to absolute bottom-0 w-full rounded-xl bg-gradient-to-t from-gray-700/80 px-4 py-3">
                <h2 className="line-clamp-1 text-4xl font-semibold text-white drop-shadow">
                  {data.posts[1].title!}
                </h2>
                <p className="line-clamp-2 text-gray-200 drop-shadow">
                  {data.posts[1].description!}
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="mx-auto flex w-full max-w-7xl flex-col justify-around gap-6 px-6 py-12 lg:flex-row lg:px-0">
          {/* Conteúdo */}
          {data.posts.length > 0 && (
            <div className="max-w-screen-xl py-3 2xl:mx-auto">
              <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-4 ">
                {data.posts.map((metadata: any, index: number) => (
                  <BlogCard
                    key={`key-post-metadata-${index}`}
                    data={metadata}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Produtos */}
        <section className="mx-auto flex w-full py-12 lg:px-0">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-0">
            <MDX source={data.mdxSource} />
          </div>
        </section>
      </div>
      <FooterSection
        data={{
          colors: {
            backgroundFooter: data.site.colors["backgroundFooter"],
            colorContrastFooter: data.site.colors["colorContrastFooter"],
          },
          site: data?.site,
        }}
      />
    </>
  );
}
