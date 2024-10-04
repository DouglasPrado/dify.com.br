import BlurImage from "@/components/global/blur-image";
import { placeholderBlurhash } from "@/lib/utils";
import Link from "next/link";
import { Highlight } from "react-instantsearch";

interface ContentCardProps {
  data: any;
  hit?: boolean;
  actions?: ("addCollection" | "addFavorite")[];
  openActions?: boolean;
}

export default function ContentCard({ data, hit = true }: ContentCardProps) {
  return (
    <Link href={`/${data.slug}`}>
      <div
        className={`ease hover:-translate-y-1 h-full w-full overflow-hidden rounded-xl shadow-xl shadow-stone-200 transition-all duration-200 hover:text-gray-800 hover:shadow-xl md:max-w-full dark:border-stone-800`}
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
            {hit ? (
              <Highlight
                attribute="title"
                hit={data}
                classNames={{
                  highlighted: "font-black text-black bg-gray-50 ",
                }}
              />
            ) : (
              data.title || "(Sem título)"
            )}
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
