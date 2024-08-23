import BlurImage from "@/components/global/blur-image";
import { cn } from "@/lib/utils";
import { Media, Post, Site } from "@prisma/client";
import Link from "next/link";

interface BlogPopularsSectionProps {
  data: Post[] & { site: Site } & { medias: Media[] };
}
export default function BlogPopularsSection({
  data,
}: BlogPopularsSectionProps) {
  return (
    <div className="relative w-full overflow-y-auto rounded-xl border border-stone-100 px-4 shadow-md transition-all hover:shadow-xl ">
      <h1 className={cn("rounded-full py-2 text-2xl font-bold")}>
        Os mais populares
      </h1>
      <div className="flex flex-col gap-3 py-2">
        {data.map((popular: Post, idxPopular: number) => (
          <Link
            href={`/${popular.slug}`}
            key={`key-popular-${idxPopular}`}
            className="flex cursor-pointer gap-6 rounded-xl px-4 py-2 hover:bg-stone-200 hover:text-slate-300"
          >
            <div className="relative h-16 w-16 flex-none">
              <BlurImage
                src={popular.image!}
                alt={popular.title ?? "Post Popular Post"}
                width={120}
                height={120}
                className="absolute h-full rounded-full bg-stone-100 object-cover "
                placeholder="blur"
                blurDataURL={popular.imageBlurhash!}
              />
            </div>
            <div className="flex w-full grow flex-col gap-2">
              <h1 className="line-clamp-2 font-title text-slate-600">
                {popular.title}
              </h1>
              <span className="text-light text-xs text-slate-700">
                {/* @ts-ignore */}
                {popular?.columnist?.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
