"use client";
import { placeholderBlurhash } from "@/lib/utils";
import type { Columnist, Media, Post, Site } from "@prisma/client";
import Link from "next/link";
import BlurImage from "../../global/blur-image";

interface HeroSectionProps {
  data: Post[] & { site: Site } & { medias: Media[] } & {
    columnist: Columnist;
  };
}

export default function BlogSecondSection({ data }: HeroSectionProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
      {data.map(
        (article, idx) =>
          idx > 0 && (
            <Link
              key={`key-article-${idx}-highlight`}
              href={`/${article.slug}`}
            >
              <div
                className={`hover:-transtone-y-1 h-full overflow-hidden transition-all duration-200 hover:text-gray-800 hover:shadow-xl dark:border-stone-800`}
              >
                <BlurImage
                  src={article.image!}
                  alt={article.title ?? "Blog Post"}
                  width={500}
                  height={400}
                  className="h-96 w-full  object-contain"
                  placeholder="blur"
                  blurDataURL={article.imageBlurhash ?? placeholderBlurhash}
                  style={{
                    backgroundImage: `url("${article.imageBlurhash}") no-repeat`,
                  }}
                />

                <div className="flex flex-col justify-center px-4 py-3 dark:border-stone-700 dark:bg-black">
                  <h3 className="line-clamp-1 font-title text-lg tracking-wide dark:text-white">
                    {article.title}
                  </h3>

                  <p className="my-2 line-clamp-3 text-sm font-light text-gray-700 xl:line-clamp-2">
                    {article.description}
                  </p>
                </div>
              </div>
            </Link>
          ),
      )}
    </div>
  );
}
