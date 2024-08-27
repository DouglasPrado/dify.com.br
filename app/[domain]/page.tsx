// import FooterSection from "@/components/sections/products/footer-section";
import BlogPage from "@/components/page/blog-page";
import {
  getCategoriesForSite,
  getCollectionsForSite,
  getPostsHighLightForSite,
  getSiteData,
} from "@/lib/fetchers";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain);
  const data = await getSiteData(domain);
  if (!data) {
    return null;
  }
  const {
    titleSEO: title,
    descriptionSEO: description,
    image,
    logo,
    favicon,
  } = data as {
    name: string;
    titleSEO: string;
    descriptionSEO: string;
    description: string;
    image: string;
    logo: string;
    favicon: string;
  };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [favicon],
      creator: "@douglasprado",
    },
    icons: {
      icon: favicon,
    },
    metadataBase: new URL(`https://${domain}`),
  };
}
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
    .flatMap(({ subdomain, customDomain }: any) => [
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
  const [site, postsHightLights, collections, categories]: any =
    await Promise.all([
      getSiteData(domain),
      getPostsHighLightForSite(domain),
      getCollectionsForSite(domain),
      getCategoriesForSite(domain),
    ]);

  if (!site) {
    notFound();
  }

  return (
    <BlogPage
      data={site}
      collections={collections}
      categories={categories}
      postsHightLights={postsHightLights}
    />
  );
}
