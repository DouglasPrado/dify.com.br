import AsaasForm from "@/components/form/asaas/asaas-form";
import BlurImage from "@/components/global/blur-image";
import FBAnalytics from "@/components/global/fb-analytics";
import GoogleAnalytics from "@/components/global/google-analytics";
import { getProductData, getSiteData } from "@/lib/fetchers";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
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
//     .flatMap(({ site, url }: any) => [
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

export default async function SiteCheckoutAsaasPage({
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

  const priceBRLPartials = (data.price / 100 / 12).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const priceOldBRL = (data.price / 100 / 0.7).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const priceBRL = (data.price / 100).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const priceBRLWithPix = ((data.price / 100) * 0.9).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="flex h-full flex-col items-center justify-center bg-white ">
      <div className="flex h-full  min-h-screen w-full flex-col  text-center">
        {/* Primeira dobra */}
        <div className="mx-auto grid w-full max-w-7xl p-3 py-6 lg:grid-cols-2">
          <section className="flex flex-col items-center gap-6 lg:items-start lg:justify-start ">
            {data.site.logo ? (
              <BlurImage
                alt={`[${data.site?.logo}]`}
                height={130}
                src={data.site.logo}
                width={70}
              />
            ) : (
              <div className="absolute flex h-full w-full select-none items-center justify-center bg-stone-100 text-4xl text-stone-500">
                ?
              </div>
            )}
            <div className="flex w-full flex-col items-center justify-center lg:items-start">
              <h1 className="text-center font-title text-xl">{data.title}</h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${data.shortDescription}`,
                }}
                className="hidden text-left lg:block"
              />
            </div>

            <div className="flex w-full flex-col items-center justify-center lg:items-start lg:justify-start">
              <div className="flex w-full flex-col items-center pb-3 lg:items-start">
                <span className="text-3xl font-bold text-green-500">
                  {priceBRLWithPix} no pix
                </span>
                <div className="flex items-center gap-2 ">
                  <span className="font-semibold">ou</span>
                  <span className="font-semibold text-slate-700 line-through">
                    {priceOldBRL}
                  </span>
                  <span className="text-2xl font-black">{priceBRL}</span>
                </div>
                <span className="animate-pulse text-center text-sm text-green-500">
                  Você está economizando{" "}
                  <strong className="font-title">
                    {(data.price / 100 / 0.7 - data.price / 100).toLocaleString(
                      "pt-br",
                      {
                        style: "currency",
                        currency: "BRL",
                      },
                    )}{" "}
                  </strong>
                  comprando agora!
                </span>
              </div>
              <div className=" flex w-full items-center justify-center gap-1 lg:justify-start">
                <ShieldCheck width={18} />
                <span className="text-sm font-light text-gray-600">12x de</span>
                <strong className=" text-gray-800">{priceBRLPartials}</strong>
                <span className="text-sm font-light text-gray-600">
                  sem juros
                </span>
              </div>
              <div className="py-3">
                <p className="font-title text-xs text-gray-700 lg:px-12">
                  Ambiente criptografado e 100% seguro.
                </p>
                <Image
                  src={`/compra-segura.png`}
                  width={340}
                  height={28}
                  alt="[compra segura]"
                />
              </div>
            </div>
          </section>

          <AsaasForm product={data} />
        </div>
      </div>
      <GoogleAnalytics
        gaTrackingId={data.site.gaTrackingId}
        gtag={`
            gtag("event", "begin_checkout", {
              currency: "BRL",
              value: ${data.price / 100},
              items: [
                {
                  item_id: "${data.id}",
                  item_name: "${data.title}",
                  price: ${data.price / 100},
                  quantity: 1
                }
              ]
            });`}
      />
      <FBAnalytics
        fbPixelId={data.site.fbPixelId}
        fbq={`fbq('track', 'InitiateCheckout',
            {
              content_ids: ['partner_event_id'],
              eventref: 'fb_oea'
            }
          );`}
      />
    </div>
  );
}
