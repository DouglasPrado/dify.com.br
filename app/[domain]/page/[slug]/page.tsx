import MDX from "@/components/global/mdx";
import FooterSection from "@/components/sections/products/footer-section";
import NavSection from "@/components/sections/products/nav-section";
import { getCategoriesForSite, getPageData, getSiteData } from "@/lib/fetchers";
import prisma from "@/lib/prisma";
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
    getPageData(domain, slug),
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
  const allPages = await prisma.page.findMany({
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

  const allPaths = allPages
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

export default async function SitePage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);
  const [data, categories]: any = await Promise.all([
    getPageData(domain, slug),
    getCategoriesForSite(domain),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center">
      <NavSection
        logo={{ logo: data.site.logo, config: data.site.logoConfig }}
        categories={categories}
      />
      <div className="flex w-full flex-col items-center justify-between ">
        <div className="m-auto w-full py-6 pb-12 text-center md:w-7/12">
          <h1 className="my-6 font-title text-3xl font-bold text-stone-800 md:text-6xl dark:text-white">
            {data.title}
          </h1>
          <p className="text-md m-auto w-10/12 text-stone-600 md:text-lg dark:text-stone-400">
            {data.description}
          </p>
        </div>
      </div>

      <MDX source={data.mdxSource} />

      <div className="w-full items-center justify-center">
        <FooterSection
          data={{
            colors: {
              backgroundFooter: data.site.colors["backgroundFooter"],
              colorContrastFooter: data.site.colors["colorContrastFooter"],
            },
            site: data.site,
          }}
        />
      </div>
      <GoogleTagManager gtmId={data.site.gaGTMId} />
    </div>
  );
}
