import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Site } from "@prisma/client";
import { BarChart, PenTool } from "lucide-react";
import Link from "next/link";

export default function SiteCard({
  data,
}: {
  data: Site & { _count: { posts: number } };
}) {
  const url = data.customDomain
    ? data.customDomain
    : `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  return (
    <div className="relative flex flex-col justify-center rounded-lg border border-stone-100 p-4 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link
        href={`/site/${data.id}/planning`}
        className="flex space-x-3 overflow-hidden rounded-lg px-0"
      >
        <Avatar>
          <AvatarImage
            src={`${data.favicon}`}
            alt={data.name ?? "Card thumbnail"}
          />
          <AvatarFallback className="bg-stone-200 uppercase">
            {data.name?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div className=" flex w-full flex-col justify-center">
          <h3 className="line-clamp-1 font-title text-sm font-bold tracking-wide text-stone-800 dark:text-white">
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
            className="line-clamp-1 text-xs font-light text-stone-400  transition-colors  hover:underline dark:bg-stone-800 dark:text-stone-400 "
          >
            {url} ↗
          </a>
        </div>
      </Link>
      <div className="mt-2 flex items-center gap-3 px-0 text-xs text-stone-400">
        <span className="flex items-center gap-1">
          <PenTool size={14} />
          {data._count.posts} conteúdos
        </span>
        <span className="flex items-center gap-1">
          <BarChart size={14} />0 cliques
        </span>
      </div>
    </div>
  );
}
