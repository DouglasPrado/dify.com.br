import BlurImage from "@/components/global/blur-image";
import { placeholderBlurhash } from "@/lib/utils";
import { Product, ProductSources, Site, Tag } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import DeleteProductButton from "./delete-product-button";
import ResendProductAIButton from "./resend-product-ai-button";

export default function ProductList({
  data,
}: {
  data: Product & { site: Site | null; tags: Tag[]; sources: ProductSources[] };
}) {
  const url = `${data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/post/${data.url}`;

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
      <Link
        href={`/product/${data.id}`}
        className="flex items-center justify-between gap-6"
      >
        <BlurImage
          alt={data.title ?? "Card thumbnail"}
          width={0}
          height={0}
          className="aspect-[16/9] w-full object-contain"
          style={{
            width: "90px",
            height: "auto",
          }}
          src={data.image ?? "/placeholder.png"}
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        />
        <div className="flex w-full flex-col">
          <span className="my-0 line-clamp-3 text-sm  tracking-wide text-stone-700 dark:text-white">
            {data.title}
          </span>
        </div>
      </Link>
      <div className="flex">
        {data.sources.map((source: any, idx: number) => (
          <Image
            key={`key-source-idx-${idx}`}
            src={SOURCES[`${source.source}`].icon}
            alt={`[${source.source}]`}
            height={0}
            width={0}
            className="mr-6 h-6 w-auto"
            style={{
              width: "48px",
              height: "100%",
            }}
          />
        ))}
      </div>
      <div className="flex gap-4">
        <DeleteProductButton productId={data.id} />
        <ResendProductAIButton productId={data.id} />
      </div>
    </div>
  );
}

const SOURCES: any = {
  Amazon: {
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  "Mercado Livre": {
    icon: "https://logopng.com.br/logos/mercado-livre-88.png",
  },
  Shopee: {
    icon: "https://i.pinimg.com/originals/05/7b/27/057b274c134bcf92ac151758478949b3.png",
  },
  Aliexpress: {
    icon: "https://cdn.icon-icons.com/icons2/2699/PNG/512/aliexpress_logo_icon_168669.png",
  },
};
