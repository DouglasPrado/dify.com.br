import BlurImage from "@/components/global/blur-image";
import { placeholderBlurhash } from "@/lib/utils";
import Link from "next/link";

export default function IntegrationCard({ data }: { data: any }) {
  const url = `${data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`;

  return (
    <div className="relative rounded-lg shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link
        href={`/post/${data.id}`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
        <div className="relative h-32 overflow-hidden">
          <BlurImage
            alt={data.title ?? "Card thumbnail"}
            width={500}
            height={400}
            className="h-full object-cover"
            src={data.logo ?? "/placeholder.png"}
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          />
        </div>
        <div className="p-4 ">
          <h3 className="my-0 truncate font-title text-sm font-bold tracking-wide dark:text-white ">
            {data.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-xs font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
