import BlurImage from "../../../../../../../components/global/blur-image";

import { placeholderBlurhash } from "@/lib/utils";
import { Highlight } from "react-instantsearch";
import AddPostCollectionButton from "../../navigation/collections/_components/add-post-collection-button";
import AddProductCollectionButton from "../../navigation/collections/_components/add-product-collection-button";

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
    <div className="ease hover:-transtone-y-1 h-full overflow-hidden rounded-xl bg-white transition-all duration-200 hover:border-stone-600 hover:text-stone-600 hover:shadow-xl dark:border-stone-800">
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
  );
}
