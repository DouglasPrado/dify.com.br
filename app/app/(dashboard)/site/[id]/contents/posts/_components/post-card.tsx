import BlurImage from "@/components/global/blur-image";
import Tags from "@/components/global/tags";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { placeholderBlurhash } from "@/lib/utils";
import { Post, Site, Tag } from "@prisma/client";
import Link from "next/link";

export default function PostCard({
  data,
}: {
  data: Post & { site: Site | null; tags: Tag[] };
}) {
  const url = `${data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/post/${data.slug}`;

  return (
    <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link
        href={`/post/${data.id}`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
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
            {!data.published && (
              <span className="absolute bottom-5 right-2 rounded-md border border-stone-200 bg-white px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md">
                Draft
              </span>
            )}
          </div>
        </AspectRatio>
        <div className="border-t border-stone-200 p-4 dark:border-stone-700">
          <h3 className="my-0 line-clamp-2 font-title text-sm font-bold tracking-wide dark:text-white">
            {data.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.description}
          </p>
        </div>
      </Link>
      <div className="absolute bottom-4 flex w-full px-4">
        <Tags tags={data.tags} />
      </div>
    </div>
  );
}
