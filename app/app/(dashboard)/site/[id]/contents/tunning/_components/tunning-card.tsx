import { ContentFineTunning } from "@prisma/client";
import { Edit2, Trash } from "lucide-react";
import Link from "next/link";

export default function TunningCard({ data }: { data: ContentFineTunning }) {
  return (
    <div className="relative rounded-lg border border-stone-200 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <div className="flex flex-col overflow-hidden rounded-lg p-6">
        <div className="flex flex-col gap-1">
          <div className="flex w-full items-center justify-between gap-1">
            <Link href={`/tunning/${data.id}`}>
              <h3 className="font-cal text-base uppercase text-stone-700">
                {data.interface}
              </h3>
            </Link>
            <div className="flex items-center gap-3">
              <Link href={`/tunning/${data.id}`}>
                <Edit2 className="text-stone-500" size={14} />
              </Link>
              <Link href={`/tunning/${data.id}`}>
                <Trash className="text-rose-500" size={14} />
              </Link>
            </div>
          </div>
          <h4 className="text-sm text-stone-400">{data.type}</h4>
        </div>
        <Link href={`/tunning/${data.id}`}>
          <p className="line-clamp-2 text-sm font-light text-stone-400">
            {data.content}
          </p>
        </Link>
      </div>
    </div>
  );
}
