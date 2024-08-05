import {
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
  const products = await getProductsForSite(domain);
  const pages = await getPagesForSite(domain);

  return [
    {
      url: `https://${domain}`,
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
      url: `https://${domain}/page/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
