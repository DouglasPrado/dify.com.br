import BlurImage from "../../../../../../../components/global/blur-image";

import { placeholderBlurhash } from "@/lib/utils";
import Link from "next/link";
import { Highlight } from "react-instantsearch";
import AddPostCollectionButton from "../../collections/collections/_components/add-post-collection-button";
import AddProductCollectionButton from "../../collections/collections/_components/add-product-collection-button";

interface ContentCardProps {
  data: any;
  hit?: boolean;
  actions?: ("addCollection" | "addFavorite")[];
  openActions?: boolean;
}

export default function ContentCard({
  data,
  openActions,
  actions,
  hit = true,
}: ContentCardProps) {
  return (
    <div className="ease h-full overflow-hidden rounded-xl bg-white transition-all duration-200 hover:-translate-y-1 hover:border-stone-600 hover:text-slate-600 hover:shadow-xl dark:border-stone-800">
      <div className="flex h-full flex-col rounded-xl p-3">
        <BlurImage
          src={data.image!}
          alt={data.title ?? "Product Product"}
          width={500}
          height={400}
          className="h-44 w-full bg-white object-contain"
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        />
        <Link
          href={
            data.type === "product" ? `/product/${data.id}` : `/post/${data.id}`
          }
        >
          <div className="h-24 pt-3 dark:bg-black">
            <div>
              <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                {data.type}
              </span>
            </div>
            <h3 className="m-2 line-clamp-2 font-title text-sm tracking-wide dark:text-white">
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
          </div>
        </Link>
        {openActions && (
          <div className="flex w-full gap-3">
            {actions?.map((action, AcIdx) =>
              action === "addCollection" ? (
                data.type === "product" ? (
                  <AddProductCollectionButton key={AcIdx} productId={data.id} />
                ) : (
                  data.type === "post" && (
                    <AddPostCollectionButton key={AcIdx} postId={data.id} />
                  )
                )
              ) : action === "addFavorite" ? (
                data.type === "product" && (
                  <AddProductCollectionButton key={AcIdx} productId={data.id} />
                )
              ) : null,
            )}
          </div>
        )}
      </div>
    </div>
  );
}
