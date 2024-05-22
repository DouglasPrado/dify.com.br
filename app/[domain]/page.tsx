// import FooterSection from "@/components/sections/products/footer-section";
import BlogPage from "@/components/page/blog-page";
import LinkPage from "@/components/page/link-page";
import {
  getCollectionsForSite,
  getColumnsForSite,
  getLinkData,
  getPostsForSite,
  getPostsHighLightForSite,
  getProductsForSite,
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
  const [
    data,
    posts,
    postsHightLights,
    products,
    collections,
    columnists,
  ]: any = await Promise.all([
    getSiteData(domain),
    getPostsForSite(domain),
    getPostsHighLightForSite(domain),
    getProductsForSite(domain),
    getCollectionsForSite(domain),
    getColumnsForSite(domain),
  ]);

  if (!data) {
    notFound();
  }

  const link = await getLinkData(data?.pageUrl);

  return (
    <>
      {data.pageMain === "blog" && (
        <BlogPage
          data={data}
          collections={collections}
          posts={posts}
          postsHightLights={postsHightLights}
          products={products}
          columnists={columnists}
        />
      )}
      {data.pageMain === "link" && <LinkPage data={link} />}
    </>
  );
}
