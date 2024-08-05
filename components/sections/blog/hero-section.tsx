"use client";
import { cn } from "@/lib/utils";
import BlurImage from "../../global/blur-image";

import type { Columnist, Media, Post, Site } from "@prisma/client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Link from "next/link";

interface HeroSectionProps {
  data: Post & { site: Site } & { medias: Media[] } & { columnist: Columnist };
}

export default function BlogHeroSection({ data }: HeroSectionProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
      <Link
        href={`/${data.slug}`}
        className={cn(
          "shadow-md transition-all ",
          `relative col-span-2 h-full w-full`,
        )}
      >
        <AspectRatio ratio={16 / 9} className={"h-full w-full"}>
          <BlurImage
            src={data.image!}
            alt={data.title ?? "Blog Post"}
            width={400}
            height={300}
            className="h-full w-full object-contain"
            placeholder="blur"
            blurDataURL={data.imageBlurhash!}
            style={{
              backgroundImage: `url("${data.imageBlurhash}") no-repeat`,
            }}
          />
          <div className="absolute bottom-0 h-full w-full bg-[#203656]/40 px-4 py-3" />
        </AspectRatio>
      </Link>
      <div className="flex flex-col justify-center gap-3 lg:gap-6">
        <h1 className="font-title text-xl lg:text-5xl">{data.title}</h1>
        <h2 className="line-clamp-3 font-light text-stone-700">
          {data.description}
        </h2>
        <span className="text-sm font-extralight text-stone-400">
          {data.columnist.name}
        </span>
      </div>
    </div>
  );
}
