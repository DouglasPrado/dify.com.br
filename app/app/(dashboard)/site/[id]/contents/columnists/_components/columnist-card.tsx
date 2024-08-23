import { Columnist } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function ColumnistCard({ data }: { data: Columnist }) {
  return (
    <Link
      href={`/columnist/${data.id}`}
      className="relative w-full shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white"
    >
      <div className="flex w-full  flex-col justify-center overflow-hidden ">
        <div className="flex gap-6 border  border-stone-200 p-4 dark:border-stone-700">
          <Image
            alt=""
            src={data.image!}
            width={400}
            height={400}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="my-0 truncate font-title text-xl font-bold tracking-wide dark:text-white">
              {data.name}
            </h3>
            <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
