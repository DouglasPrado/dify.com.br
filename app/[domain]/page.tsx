// import FooterSection from "@/components/sections/products/footer-section";
import BlogPage from "@/components/page/blog-page";
import {
  getCategoriesForSite,
  getCollectionsForSite,
  getPostsHighLightForSite,
  getSiteData,
} from "@/lib/fetchers";
import prisma from "@/lib/prisma";
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
  const [site, postsHightLights, collections, categories]: any = await Promise.all([
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
