import BlurImage from "@/components/global/blur-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { placeholderBlurhash } from "@/lib/utils";
import { Product, ProductSources, Site, Tag } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import DeleteProductButton from "./delete-product-button";
import ResendProductAIButton from "./resend-product-ai-button";

export default function ProductCard({
  data,
}: {
  data: Product & { site: Site | null; tags: Tag[]; sources: ProductSources[] };
}) {
  const url = `${data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/post/${data.url}`;

  return (
    <div className="relative rounded-lg  shadow-md shadow-gray-100 transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <div className="flex h-full flex-col overflow-hidden rounded-lg">
        <AspectRatio ratio={16 / 9}>
          <div className="relative overflow-hidden">
            <BlurImage
              alt={data.title ?? "Card thumbnail"}
              width={0}
              height={0}
              className="aspect-[16/9] w-full object-contain"
              style={{
                width: "500px",
                height: "auto",
              }}
              src={data.image ?? "/placeholder.png"}
              placeholder="blur"
              blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
            />
            <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-400 bg-white shadow">
              <DeleteProductButton productId={data.id} />
            </div>
            <div className="absolute right-12 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
              <ResendProductAIButton productId={data.id} />
            </div>
          </div>
        </AspectRatio>

        <Link
          href={`/product/${data.id}`}
          className="h-full cursor-pointer  p-4"
        >
          <div className="flex justify-center gap-2 py-3">
            {data.sources.map((source: any, idx: number) => (
              <Image
                key={`key-source-idx-${idx}`}
                src={SOURCES[`${source.source}`].icon}
                alt={`[${source.source}]`}
                height={0}
                width={0}
                className="h-6 w-auto"
                style={{
                  width: "48px",
                  height: "100%",
                }}
              />
            ))}
          </div>
          <span className="my-0 line-clamp-3 text-xs font-semibold tracking-wide text-stone-700 dark:text-white">
            {data.title}
          </span>
          <p className="mt-2 line-clamp-3 hidden text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.subTitle}
          </p>
        </Link>
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
