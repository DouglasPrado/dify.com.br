import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Site } from "@prisma/client";
import { BarChart, PenTool } from "lucide-react";
import Link from "next/link";

export default function SiteCard({ data }: { data: Site }) {
  const url = data.customDomain
    ? data.customDomain
    : `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  return (
    <div className="relative  rounded-lg border  border-stone-100 p-4 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link
        href={`/site/${data.id}/planning`}
        className="flex space-x-4 overflow-hidden rounded-lg px-4"
      >
        <Avatar>
          <AvatarImage
            src={`${data.logo}`}
            alt={data.name ?? "Card thumbnail"}
          />
          <AvatarFallback className="uppercase">
            {data.name?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div className=" flex w-full flex-col justify-center">
          <h3 className="truncate font-title text-xl font-bold tracking-wide text-stone-800 dark:text-white">
            {data.name}
          </h3>
          <a
            href={
              process.env.NEXT_PUBLIC_VERCEL_ENV
                ? `https://${url}`
                : `http://${data.subdomain}.localhost:3000`
            }
            target="_blank"
            rel="noreferrer"
            className="truncate text-xs font-light text-stone-400  transition-colors  hover:underline dark:bg-stone-800 dark:text-stone-400 "
          >
            {url} ↗
          </a>
        </div>
      </Link>
      <div className="mt-2 flex items-center gap-3 px-4 text-xs text-stone-400">
        <span className="flex items-center gap-1">
          <PenTool size={14} />0 conteúdos
        </span>
        <span className="flex items-center gap-1">
          <BarChart size={14} />0 cliques
        </span>
      </div>
    </div>
  );
}
