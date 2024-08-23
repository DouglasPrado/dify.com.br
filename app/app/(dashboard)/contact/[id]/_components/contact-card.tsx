import { Lead } from "@prisma/client";

export default function ContactCard({ data }: { data: Lead }) {
  return (
    <div className="relative w-full shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <div className="flex w-full  flex-col justify-center overflow-hidden ">
        <div className="border  border-stone-200 p-4 dark:border-stone-700">
          <h3 className="my-0 truncate font-title text-xl font-bold tracking-wide dark:text-white">
            {data.name}
          </h3>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.email}
          </p>
        </div>
      </div>
    </div>
  );
}
