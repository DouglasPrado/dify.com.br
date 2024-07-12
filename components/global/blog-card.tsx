import Link from "next/link";
import BlurImage from "./blur-image";

import { placeholderBlurhash } from "@/lib/utils";
import type { Columnist, Post } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Icon from "./icon";

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
    <Link href={`/post/${data.slug}`}>
      <div
        className={`ease h-full w-full overflow-hidden rounded-xl shadow-xl shadow-stone-200 transition-all duration-200 hover:-translate-y-1 hover:text-gray-800 hover:shadow-xl md:max-w-full dark:border-stone-800`}
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
          <div className="flex gap-1">
            {data?.tags?.map((tag: any, idxTag: number) => (
              <TooltipProvider key={`key-tag-${idxTag}`}>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className="rounded bg-black/10 p-1"
                      style={{ backgroundColor: tag.color }}
                    >
                      <Icon
                        size={12}
                        icon={tag.icon}
                        style={{ color: tag.colorText }}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <span>{tag?.name}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          <h3 className="line-clamp-1 font-title text-lg tracking-wide text-stone-800 dark:text-white">
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
