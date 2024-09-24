import BlurImage from "@/components/global/blur-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { placeholderBlurhash } from "@/lib/utils";
import { Product, Site, Tag } from "@prisma/client";
import Link from "next/link";
import DeleteProductButton from "./delete-product-button";
import ResendProductAIButton from "./resend-product-ai-button";

export default function ProductCard({
  data,
}: {
  data: Product & { site: Site | null; tags: Tag[] };
}) {
  const url = `${data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/post/${data.url}`;

  return (
    <div className="relative rounded-lg  shadow-md shadow-gray-200 transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <div className="flex flex-col overflow-hidden rounded-lg">
        <AspectRatio ratio={16 / 9}>
          <div className="relative h-44 overflow-hidden">
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
            <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
              <DeleteProductButton productId={data.id} />
            </div>
            <div className="absolute right-12 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
              <ResendProductAIButton productId={data.id} />
            </div>
          </div>
        </AspectRatio>

        <Link
          href={`/product/${data.id}`}
          className="border-t border-stone-200 p-4 dark:border-stone-700"
        >
          <h3 className="my-0 line-clamp-2 font-title text-sm font-bold tracking-wide dark:text-white">
            {data.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.subTitle}
          </p>
        </Link>
      </div>
    </div>
  );
}
