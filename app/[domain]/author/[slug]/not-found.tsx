// import FooterSection from "@/components/sections/products/footer-section";
import Blog404Page from "@/components/page/404-page";
import {
  getCategoriesForSite,
  getCollectionsForSite,
  getPostsHighLightForSite,
  getSiteData,
} from "@/lib/fetchers";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function NotFound() {
  const headersList = headers();
  const domain: string =
    headersList
      .get("host")
      ?.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) ||
    "";

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
    <Blog404Page
      data={site}
      collections={collections}
      categories={categories}
      postsHightLights={postsHightLights}
    />
  );
}
