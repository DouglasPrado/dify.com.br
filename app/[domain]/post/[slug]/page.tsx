import BlogPost from "@/components/sections/blog/post";
import {
  getCategoriesForSite,
  getCollectionsForSite,
  getPostData,
  getSiteData,
} from "@/lib/fetchers";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Article, Person, WithContext } from "schema-dts";

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
    <BlogPost
      categories={categories}
      collections={collections}
      data={data}
      schema={schema}
      url={url}
    />
  );
}
