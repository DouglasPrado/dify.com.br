import BlogCard from "@/components/global/blog-card";
import BlurImage from "@/components/global/blur-image";
import MDX from "@/components/global/mdx";
import Shared from "@/components/global/shared";
import Tags from "@/components/global/tags";
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
  getCollectionsForSite,
  getPostData,
  getSiteData,
} from "@/lib/fetchers";
import prisma from "@/lib/prisma";
import { placeholderBlurhash } from "@/lib/utils";
import { GoogleTagManager } from "@next/third-parties/google";
import { Collection } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Article, Person, WithContext } from "schema-dts";
import RelatedCard from "./_components/related-card";

export async function generateMetadata({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);

  const [data, siteData] = await Promise.all([
    getPostData(domain, slug),
    getSiteData(domain),
  ]);
  if (!data || !siteData) {
    return null;
  }
  const { title, description } = data;

  return {
    title,
    description,
    robots: {
      "max-image-preview": "large",
      "max-video-preview": -1,
      follow: true,
      index: true,
      "max-snippet": -1,
    },
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@dify",
    },
    icons: [siteData.favicon],
    // Optional: Set canonical URL to custom domain if it exists
    ...(siteData.customDomain && {
      alternates: {
        canonical: `https://${siteData.customDomain}/${params.slug}`,
      },
    }),
  };
}

export async function generateStaticParams() {
  const allPosts = await prisma.post.findMany({
    select: {
      slug: true,
      site: true,
    },
  });

  const allPaths = allPosts
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

export default async function SitePostPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);
  const [data, categories, collections]: any = await Promise.all([
    getPostData(domain, slug),
    getCategoriesForSite(domain),
    getCollectionsForSite(domain),
  ]);

  if (!data) {
    notFound();
  }
  const url = data.site.customDomain
    ? data.site.customDomain
    : `${data.site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  const author: Person = {
    "@type": "Person",
    name: data.columnist?.name,
    url: `https://${url}/author/${data.columnist?.slug}`,
  };

  const schema: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    author,
    image: data.image,
    datePublished: data.createdAt,
    dateModified: data.updatedAt,
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto flex w-full flex-col items-center justify-center">
        <NavSection
          logo={{ logo: data.site.logo, config: data.site.logoConfig }}
          categories={categories}
        />
        <section className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-6 px-6 py-6  lg:grid-cols-2 lg:px-6 xl:px-0">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{data.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </section>
        <section className=" mx-auto grid w-full max-w-7xl flex-col items-start justify-start gap-6 p-6 lg:grid-cols-2 lg:px-6 xl:px-0">
          <div className="flex flex-col gap-3">
            <h1 className="font-title text-2xl font-bold text-stone-800 md:text-3xl xl:text-6xl dark:text-white">
              {data.title}
            </h1>
            <p className="text-md m-auto text-stone-600 md:text-lg dark:text-stone-400">
              {data.description}
            </p>
            <Tags tags={data.tags} />
            <div className="flex flex-col gap-3">
              <span className="font-cal text-sm text-stone-700">
                Compartilhe o conteúdo
              </span>
              <Shared title={data.title} url={`${url}/${data.slug}`} />
            </div>
          </div>
          <div className="relative m-auto w-full max-w-7xl overflow-hidden  md:rounded-2xl">
            <BlurImage
              alt={data.title ?? "Post image"}
              width={1200}
              height={630}
              className="h-full w-full object-cover"
              placeholder="blur"
              blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
              src={data.image ?? "/placeholder.png"}
            />
          </div>
        </section>
      </div>

      <section className=" mx-auto flex w-full max-w-7xl gap-6 py-6 xl:px-0">
        <div className="fixed left-0 top-1/3 z-50 hidden flex-col items-center justify-center gap-4 rounded-md bg-white p-4 shadow-lg 2xl:flex">
          <span className="text-[10px] text-stone-400">Compartilhe</span>
          <Shared
            title={data.title}
            url={`${url}/${data.slug}`}
            orientation="vertical"
          />
        </div>
        <div className="mx-auto flex flex-col gap-3 px-6 xl:px-0">
          {/* <EditorView initialValue={data.contentJSON} /> */}
          <MDX source={data.mdxSource} />
          <div className="flex flex-col gap-3">
            <span className="font-cal text-sm text-stone-700">
              Ajude esse conteúdo a chegar em mais pessoas.
            </span>
            <Shared title={data.title} url={`${url}/${data.slug}`} />
          </div>
        </div>
        <div className="h-full! hidden w-full max-w-[340px] flex-col items-center gap-8 rounded-xl  p-6 md:flex">
          <section className="mx-auto flex w-full flex-col gap-3 lg:px-0">
            <div className="mx-auto w-full max-w-7xl px-6 md:px-0">
              <h3 className="font-title text-xl font-semibold text-stone-700">
                Compartilhe esse conteúdo
              </h3>
            </div>
            <div className="flex w-full flex-col gap-3 ">
              <Shared title={data.title} url={`${url}/${data.slug}`} />
            </div>
          </section>
          <section className="mx-auto flex w-full flex-col gap-3 xl:px-0">
            <div className="mx-auto w-full max-w-7xl px-6 md:px-0">
              <h3 className="font-title text-xl font-semibold text-stone-700">
                Busque outros conteúdos
              </h3>
            </div>
            <div className="flex w-full flex-col gap-3">
              <Link
                href="/search"
                className="flex h-9 w-full items-center gap-2 rounded-md border bg-white px-4 text-sm text-stone-700 hover:border-stone-400 hover:text-stone-700"
              >
                <Search size={18} />
                <span>Pesquisar...</span>
              </Link>
            </div>
          </section>
          {data.relatedPosts?.length > 0 && (
            <section className="mx-auto flex w-full flex-col gap-3 xl:px-0">
              <div className="mx-auto w-full max-w-7xl px-6 md:px-0">
                <h3 className="font-title text-xl font-semibold text-stone-700">
                  Conteúdos relacionados
                </h3>
              </div>
              <div className="flex w-full flex-col gap-3">
                {data.relatedPosts.map(({ relatedPost }: any, idx: number) => (
                  <div key={`key-related-post-${idx}`}>
                    <RelatedCard key={idx} data={relatedPost} />
                  </div>
                ))}
              </div>
            </section>
          )}
          <section className="mx-auto flex w-full flex-col gap-3 xl:px-0">
            <div className="mx-auto w-full max-w-7xl px-6 md:px-0">
              <h3 className="font-title text-xl font-semibold text-stone-700">
                Nossas coleções
              </h3>
            </div>
            <div className="flex w-full flex-col gap-3">
              {collections.map(
                (
                  collection: Collection & { _count: { posts: number } },
                  idxCollection: number,
                ) => (
                  <Link
                    className="flex w-full items-center justify-between gap-2 rounded  p-4 text-sm text-stone-700 transition-all duration-200 hover:-translate-y-1 hover:bg-stone-100"
                    href={`/`}
                    key={`key-collection-${idxCollection}`}
                  >
                    {collection.name}
                    <span className="rounded-full text-sm text-stone-700">
                      {collection._count.posts}
                    </span>
                  </Link>
                ),
              )}
            </div>
          </section>
        </div>
      </section>

      {data.adjacentPosts.length > 0 && (
        <div className="relative mb-20 mt-10 sm:mt-10">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-stone-300 dark:border-stone-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-sm text-stone-500 dark:bg-black dark:text-stone-400">
              Continue lendo
            </span>
          </div>
        </div>
      )}
      {data.adjacentPosts && (
        <div className="mx-5 mb-20 grid max-w-7xl grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:mx-auto xl:grid-cols-3">
          {data.adjacentPosts.map((data: any, index: number) => (
            <BlogCard key={index} data={data} />
          ))}
        </div>
      )}
      <FooterSection
        data={{
          colors: {
            backgroundFooter: data.site.colors["backgroundFooter"],
            colorContrastFooter: data.site.colors["colorContrastFooter"],
          },
          site: data.site,
        }}
      />
      <GoogleTagManager gtmId={data.site.gaGTMId || "GTM-5V24N98"} />
    </section>
  );
}
