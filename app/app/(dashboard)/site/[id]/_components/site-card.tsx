import BlurImage from "@/components/global/blur-image";
import { placeholderBlurhash } from "@/lib/utils";
import { Site } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function SiteCard({ data }: { data: Site }) {
  const url = data.customDomain
    ? data.customDomain
    : `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  return (
    <div className="relative rounded-lg border border-stone-200 p-4 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link
        href={`/site/${data.id}/planning`}
        className="flex space-x-4 overflow-hidden rounded-lg px-4"
      >
        <div className="flex items-center justify-center">
          <BlurImage
            alt={data.name ?? "Card thumbnail"}
            width={50}
            height={50}
            className="rounded-full object-cover"
            src={data.image ?? "/placeholder.png"}
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          />
          <Image
            className="absolute rounded-full"
            alt="[LOGO]"
            src={data.logo!}
            width={50}
            height={50}
          />
        </div>

        <div className=" flex w-full flex-col justify-center">
          <h3 className="truncate font-title text-xl font-bold tracking-wide  dark:text-white">
            {data.name}
          </h3>
          <a
            href={
              process.env.NEXT_PUBLIC_VERCEL_ENV
                ? `https://${url}`
                : `http://${data.subdomain}.localhost:3000`
            }
            target="_blank"
            rel="noreferrer"
            className="mt-2 truncate rounded-md bg-stone-200 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          >
            {url} ↗
          </a>
        </div>
      </Link>
    </div>
  );
}
