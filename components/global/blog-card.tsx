import Link from "next/link";
import BlurImage from "./blur-image";

import { placeholderBlurhash } from "@/lib/utils";
import type { Columnist, Post } from "@prisma/client";

interface BlogCardProps {
  data: Pick<
    Post & { columnist: Columnist },
    | "slug"
    | "image"
    | "imageBlurhash"
    | "title"
    | "description"
    | "createdAt"
    | "columnist"
  >;
}

export default function BlogCard({ data }: BlogCardProps) {
  return (
    <Link href={`/post/${data.slug}`}>
      <div
        className={`ease h-full overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:text-gray-800 hover:shadow-xl md:max-w-full dark:border-stone-800`}
      >
        <BlurImage
          src={data.image!}
          alt={data.title ?? "Blog Post"}
          width={500}
          height={400}
          className="h-52 w-full object-contain"
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          style={{
            backgroundImage: `url("${data.imageBlurhash}") no-repeat`,
          }}
        />

        <div className="flex flex-col justify-center px-4 py-3 dark:border-stone-700 dark:bg-black">
          <h3 className="line-clamp-1 font-title text-lg tracking-wide text-stone-800 dark:text-white">
            {data.title}
          </h3>
          <p className="my-2 line-clamp-3 font-light text-gray-700 xl:line-clamp-2">
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
