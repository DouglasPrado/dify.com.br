import { PenToolIcon } from "lucide-react";
import Link from "next/link";

export default function ExplorerCard({ data }: { data: any }) {
  const url = `${data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`;

  return (
    <div className="relative rounded-lg shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link
        href={`/post/${data.id}`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
        <div className="p-4 ">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-lime-100 p-2">
              <PenToolIcon size={22} />
            </div>
            <h3 className="my-0 line-clamp-2 font-title text-sm font-bold tracking-wide text-stone-800 dark:text-white ">
              {data.title}
            </h3>
          </div>

          <p className="mt-4 line-clamp-3 text-xs font-normal leading-snug text-stone-400 dark:text-stone-400">
            {data.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
