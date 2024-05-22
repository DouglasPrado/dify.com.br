import BlurImage from "@/components/blur-image";
import { placeholderBlurhash } from "@/lib/utils";
import { Collection } from "@prisma/client";
import Link from "next/link";

export default function CollectionCard({ data }: { data: Collection }) {
  return (
    <div className="ring-blac relative rounded-lg border border-stone-200 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link
        href={`/collection/${data.id}`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
        <BlurImage
          alt={data.name ?? "Card thumbnail"}
          width={500}
          height={400}
          className="h-44 object-cover"
          src={data.image ?? "/placeholder.png"}
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        />
        <div className="border-t border-stone-200 p-4 dark:border-stone-700">
          <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white">
            {data.name ?? "(desconhecido)"}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.description ?? "Clique em editar e faça uma descrição"}
          </p>
        </div>
      </Link>
    </div>
  );
}
