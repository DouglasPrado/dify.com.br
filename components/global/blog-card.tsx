import Link from "next/link";
import BlurImage from "./blur-image";

import { placeholderBlurhash } from "@/lib/utils";
import type { Columnist, Post } from "@prisma/client";
import { AspectRatio } from "../ui/aspect-ratio";
import Tags from "./tags";

interface BlogCardProps {
  data: Pick<
    Post & { tags: any; columnist: Columnist },
    | "slug"
    | "image"
    | "imageBlurhash"
    | "title"
    | "description"
    | "createdAt"
    | "columnist"
    | "tags"
  >;
}

export default function BlogCard({ data }: BlogCardProps) {
  return (
    <Link href={`/${data.slug}`}>
      <div
        className={`ease h-full w-full overflow-hidden rounded-xl shadow-md shadow-stone-100 transition-all duration-200 hover:-translate-y-1 hover:text-gray-800 hover:shadow-xl md:max-w-full dark:border-stone-800`}
      >
        <AspectRatio ratio={16 / 9}>
          <BlurImage
            src={data.image!}
            alt={data.title ?? "Blog Post"}
            width={0}
            height={0}
            className="aspect-[16/9] w-full object-contain"
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
            style={{
              width: "500px",
              height: "auto",
              backgroundImage: `url("${data.imageBlurhash}") no-repeat`,
            }}
          />
        </AspectRatio>

        <div className="flex flex-col justify-center px-4 py-3 dark:border-stone-700 dark:bg-black">
          <Tags tags={data.tags} />
          <h3 className="line-clamp-1 font-title text-lg capitalize tracking-wide text-stone-800 dark:text-white">
            {data.title}
          </h3>
          <p className=" line-clamp-3 text-sm font-light text-stone-500 xl:line-clamp-2">
            {data.description}
          </p>
          <span className="text-xs font-thin text-gray-500">
            {data.columnist?.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
