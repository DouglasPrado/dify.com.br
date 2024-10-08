import BarCode from "@/components/global/barcode";
import BlurImage from "@/components/global/blur-image";
import CopyButton from "@/components/global/copy-button";
import { getPaymentBoleto } from "@/lib/actions/asaas/payment";
import { getProductData, getSiteData } from "@/lib/fetchers";
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

export default async function SiteCheckoutAsaasBoletoPage({
  params,
}: {
  params: { domain: string; id: string; url: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const id = decodeURIComponent(params.id);
  const url = decodeURIComponent(params.url);
  const data: any = await getPaymentBoleto(id);
  const product: any = await getProductData(domain, url);
  if (!data) {
    notFound();
  }

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-50 ">
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center text-center">
        {/* Primeira dobra */}
        <section className="flex flex-col py-6">
          {product?.site?.logo ? (
            <BlurImage
              alt={`[${product?.site?.logo}]`}
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
        <section className="mx-4 flex  flex-col items-center justify-center rounded-xl border bg-white shadow-lg">
          <div className="flex w-full rounded-t-xl bg-stone-200 px-4 py-8 text-stone-700">
            <span className="font-title text-2xl lg:text-3xl">
              Pedido recebido!
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 p-12">
            <div className="hidden md:flex ">
              {data.barCode && <BarCode value={data.barCode} />}
            </div>
            <div className="break-all border px-12 py-3">
              {data.identificationField}
            </div>
            <p className="break-all text-center">{data.payload}</p>
            <div className="flex flex-col items-center justify-center gap-3">
              <p className="flex  items-center rounded-lg border border-yellow-300 bg-yellow-300 bg-opacity-40 px-12 py-6 text-yellow-600">
                A compensação do pagamento pode levar até 3 dias úteis após o
                pagamento.
              </p>
              <p className="flex max-w-lg text-sm">
                Caso já tenha se passado mais de 72h que você efetuou o
                pagamento e ainda não recebeu seus dados de acesso, por
                gentileza, entre em contato com o vendedor para que ele possa
                verificar esta situação.
              </p>
            </div>
          </div>
          <div className="flex w-full ">
            <CopyButton string={data.payload} />
          </div>
        </section>
      </div>
    </div>
  );
}
