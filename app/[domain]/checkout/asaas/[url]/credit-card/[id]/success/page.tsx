import BlurImage from "@/components/global/blur-image";
import { getProductData, getSiteData } from "@/lib/fetchers";

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

export default async function SiteCheckoutAsaasCreditCardSuccessPage({
  params,
}: {
  params: { domain: string; id: string; url: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const id = decodeURIComponent(params.id);
  const url = decodeURIComponent(params.url);

  const product: any = await getProductData(domain, url);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-50 ">
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center text-center">
        {/* Primeira dobra */}
        <section className="flex flex-col py-6">
          {product?.site?.logo ? (
            <BlurImage
              alt={`[${product.site?.logo}]` ?? "Logo "}
              height={130}
              src={product.site.logo}
              width={70}
            />
          ) : (
            <div className="absolute flex h-full w-full select-none items-center justify-center bg-stone-100 text-4xl text-stone-500">
              ?
            </div>
          )}
        </section>
        <section className="mx-4 flex max-w-lg flex-col items-center justify-center rounded-xl border bg-white shadow-lg">
          <div className="flex w-full rounded-t-xl bg-green-200 px-4 py-8 text-green-700">
            <span className="font-title text-2xl lg:text-3xl">
              Pedido recebido!
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 p-6">
            <p className="font-title text-lg">Pagamento efetuado com sucesso</p>
            <p className="text-sm text-gray-700">
              Em breve o seu pedido será processado e você será atualizado do
              andamento e entrega.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
