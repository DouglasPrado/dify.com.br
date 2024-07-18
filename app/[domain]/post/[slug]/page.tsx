import BlogCard from "@/components/global/blog-card";
import BlurImage from "@/components/global/blur-image";
import MDX from "@/components/global/mdx";
import Tags from "@/components/global/tags";
import FooterSection from "@/components/sections/products/footer-section";
import NavSection from "@/components/sections/products/nav-section";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
  getCategoriesForSite,
  getPostData,
  getSiteData
} from "@/lib/fetchers";
import prisma from "@/lib/prisma";
import { placeholderBlurhash } from "@/lib/utils";
import { GoogleTagManager } from "@next/third-parties/google";
import { notFound } from "next/navigation";
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
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@vercel",
    },
    icons: [siteData.favicon],
    // Optional: Set canonical URL to custom domain if it exists
    // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    //   siteData.customDomain && {
    //     alternates: {
    //       canonical: `https://${siteData.customDomain}/${params.slug}`,
    //     },
    //   }),
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
    .flatMap(({ site, slug }) => [
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
  const [data, categories]: any = await Promise.all([
    getPostData(domain, slug),
    getCategoriesForSite(domain),
  ]);

  if (!data) {
    notFound();
  }
  return (
    <>
      <div className="mx-auto flex w-full flex-col items-center justify-center">
        <NavSection logo={data.site.logo} categories={categories} />
        <section className="mx-auto flex w-full max-w-screen-lg flex-col items-start justify-start gap-6 px-6 py-6  lg:grid-cols-2 lg:px-0">
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
        <section className=" mx-auto grid w-full max-w-screen-lg flex-col items-start justify-start gap-6 p-6  lg:grid-cols-2 lg:px-0">
          <div className="flex flex-col gap-3">
            <h1 className="font-title text-3xl font-bold text-stone-800 md:text-6xl dark:text-white">
              {data.title}
            </h1>
            <p className="text-md m-auto text-stone-600 md:text-lg dark:text-stone-400">
              {data.description}
            </p>
            <Tags tags={data.tags} />
          </div>
          <div className="relative m-auto w-full max-w-screen-lg overflow-hidden  md:rounded-2xl">
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
      

      <section className="mx-auto flex w-full lg:px-0 py-6">
        <div className="mx-auto max-w-screen-lg w-full px-6 md:px-0">
          <MDX source={data.mdxSource} />
        </div>
      </section>

      {data.adjacentPosts.length > 0 && (
        <div className="relative mb-20 mt-10 sm:mt-20">
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
        <div className="mx-5 mb-20 grid max-w-screen-lg grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:mx-auto xl:grid-cols-3">
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
      <GoogleTagManager gtmId={data.site.gaGTMId} />
    </>
  );
}
