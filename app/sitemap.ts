import {
  getCollectionsForSite,
  getColumnistForSite,
  getPagesForSite,
  getPostsForSite,
  getProductsForSite,
} from "@/lib/fetchers";
import { headers } from "next/headers";

export default async function Sitemap() {
  const headersList = headers();
  const domain =
    headersList
      .get("host")
      ?.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) ??
    "vercel.pub";

  const posts = await getPostsForSite(domain);
  const authors = await getColumnistForSite(domain);
  const collections = await getCollectionsForSite(domain);
  const products = await getProductsForSite(domain);
  const pages = await getPagesForSite(domain);

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/search`,
      lastModified: new Date(),
    },
    ...posts.map(({ slug }) => ({
      url: `https://${domain}/${slug}`,
      lastModified: new Date(),
    })),
    ...products.map(({ url }) => ({
      url: `https://${domain}/product/${url}`,
      lastModified: new Date(),
    })),
    ...pages.map(({ slug }) => ({
      url: `https://${domain}/p/${slug}`,
      lastModified: new Date(),
    })),
    ...authors.map(({ slug }) => ({
      url: `https://${domain}/author/${slug}`,
      lastModified: new Date(),
    })),
    ...collections.map(({ slug }) => ({
      url: `https://${domain}/c/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
