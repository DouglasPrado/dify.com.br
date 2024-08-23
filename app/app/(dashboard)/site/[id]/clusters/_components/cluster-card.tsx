import { Lead, Site, Whitelist } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function ClusterCard({
  data,
  productURL,
}: {
  data: Whitelist & { leads: Lead[]; site: Site };
  productURL?: string;
}) {
  const url = data.site.customDomain
    ? data.site.customDomain
    : process.env.NEXT_PUBLIC_VERCEL_ENV
    ? `https://${data.site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
    : `http://${data.site.subdomain}.localhost:3000`;
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-50 p-6 shadow-lg shadow-gray-200 hover:border-gray-300">
      <div className="flex flex-col">
        <Link href={`/contact/${data.id}`}>
          <h1 className="font-title  hover:text-slate-600">
            Lista do {data.name}
          </h1>
        </Link>
        <button className="text-sm font-light text-gray-700">
          {decodeURIComponent(
            `${url}/product/${productURL}?utm_source=${
              data.utm_source
            }&utm_campaign=${data.utm_campaign}&utm_medium=${data.utm_medium!}`,
          )}
        </button>
        <div className="flex w-full items-center justify-start gap-1 pt-2">
          <Image
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${data.utm_source}`}
            alt={`${data.utm_source}`}
            className="mr-1"
            width={20}
            height={20}
          />
          <div className="text-sm uppercase text-gray-700">
            [{data.utm_source}]
          </div>
          <div className="text-sm uppercase text-gray-700">
            {data.utm_campaign}
          </div>
          <div className="text-sm uppercase text-gray-700 ">
            [{data.utm_medium}]
          </div>
          <div className="text-sm uppercase text-gray-700">
            {data.utm_content}
          </div>
        </div>
      </div>
      <h3 className="text-sm text-gray-800">
        Essa lista possui {data.leads.length} contatos
      </h3>
    </div>
  );
}
