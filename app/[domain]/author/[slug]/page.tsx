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
  getColumnistData,
  getSiteData,
} from "@/lib/fetchers";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Person, WithContext } from "schema-dts";

export async function generateMetadata({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);

  const [data, siteData] = await Promise.all([
    getColumnistData(domain, slug),
    getSiteData(domain),
  ]);
  if (!data || !siteData) {
    return null;
  }
  const { name, description } = data;

  return {
    name,
    description,
    openGraph: {
      name,
      description,
    },
    robots: {
      "max-image-preview": "large",
      "max-video-preview": -1,
      follow: true,
      index: true,
      "max-snippet": -1,
    },
    twitter: {
      card: "summary_large_image",
      name,
      description,
      creator: "@dify",
    },
    icons: [siteData.favicon],
    // Optional: Set canonical URL to custom domain if it exists
    ...(siteData.customDomain && {
      alternates: {
        canonical: `https://${siteData.customDomain}/author/${params.slug}`,
      },
    }),
  };
}

export async function generateStaticParams() {
  const allColumnists = await prisma.columnist.findMany({
    select: {
      slug: true,
      site: true,
    },
  });

  const allPaths = allColumnists
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

export default async function SiteColumnistPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);
  const [data, categories, collections]: any = await Promise.all([
    getColumnistData(domain, slug),
    getCategoriesForSite(domain),
    getCollectionsForSite(domain),
  ]);

  if (!data) {
    notFound();
  }
  const url = data.site.customDomain
    ? data.site.customDomain
    : `${data.site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  const author: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.columnist?.name,
    url: `https://${url}/author/${data.columnist?.slug}`,
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(author) }}
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
                <BreadcrumbPage>{data.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </section>
        <section className=" mx-auto grid w-full max-w-7xl flex-col items-start justify-start gap-6 p-6 lg:grid-cols-2 lg:px-6 xl:px-0">
          <div className="flex flex-col gap-3">
            <h1 className="font-title text-3xl font-bold text-stone-800 md:text-6xl dark:text-white">
              {data.name}
            </h1>
            <p className="text-md m-auto text-stone-600 md:text-lg dark:text-stone-400">
              {data.description}
            </p>
          </div>
        </section>
      </div>

      <FooterSection
        data={{
          colors: {
            backgroundFooter: data.site.colors["backgroundFooter"],
            colorContrastFooter: data.site.colors["colorContrastFooter"],
          },
          site: data.site,
        }}
      />
    </section>
  );
}
