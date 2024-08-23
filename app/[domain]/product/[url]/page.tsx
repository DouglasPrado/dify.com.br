import AttributesSection from "@/components/sections/products/attributes-section";
import BenefitsSection from "@/components/sections/products/benefits-section";
import FAQSSection from "@/components/sections/products/faqs-section";
import FooterSection from "@/components/sections/products/footer-section";
import GuaranteesSection from "@/components/sections/products/guarantees-section";
import HeroSection from "@/components/sections/products/hero-section";
import ReviewsSection from "@/components/sections/products/reviews-section";
import { getProductData, getSiteData } from "@/lib/fetchers";
import { GoogleTagManager } from "@next/third-parties/google";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { domain: string; url: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const url = decodeURIComponent(params.url);

  const [data, siteData] = await Promise.all([
    getProductData(domain, url),
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
      creator: "@dify",
    },
    icons: [siteData.favicon],
    // Optional: Set canonical URL to custom domain if it exists
    ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
      siteData.customDomain && {
        alternates: {
          canonical: `https://${siteData.customDomain}/${params.url}`,
        },
      }),
  };
}

// export async function generateStaticParams() {
//   const allProducts = await prisma.product.findMany({
//     select: {
//       id: true,
//       url: true,
//       site: {
//         select: {
//           subdomain: true,
//           customDomain: true,
//         },
//       },
//     },
//   });

//   const allPaths = allProducts
//     .flatMap(({ site, url }) => [
//       site?.subdomain && {
//         domain: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
//         url,
//       },
//       site?.customDomain && {
//         domain: site.customDomain,
//         url,
//       },
//     ])
//     .filter(Boolean);

//   return allPaths;
// }

export default async function SiteProductPage({
  params,
}: {
  params: { domain: string; url: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const url = decodeURIComponent(params.url);
  const data: any = await getProductData(domain, url);

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <div className="m-auto w-full bg-white text-center ">
          {/* Primeira dobra */}
          <HeroSection data={data} />
          {/* Beneficios */}
          <BenefitsSection data={data} />
          {/* Atributos */}
          <AttributesSection data={data} />
          {/* Avaliações */}
          <ReviewsSection data={data} />
          {/* Garantia */}
          <GuaranteesSection data={data} />
          {/* Perguntas frequentes */}
          <FAQSSection data={data} />
          {/* Rodapé */}
          <FooterSection data={data} />
        </div>
        <GoogleTagManager gtmId={data.site.gaGTMId || "GTM-5V24N98"} />
      </div>
    </>
  );
}
