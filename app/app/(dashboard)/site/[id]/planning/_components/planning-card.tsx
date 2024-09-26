import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Queue } from "@prisma/client";
import { format, isBefore } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import {
  ExternalLink,
  Layout,
  Newspaper,
  Share2,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import PlanningStatus from "./planning-status";
export default async function PlanningCard({ data }: { data: Queue }) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  const compareDateSchedule = isBefore(new Date(data.scheduleAt), new Date());
  return (
    <div
      className={cn(
        "flex w-full items-center gap-6 rounded-lg border   transition-all",
        compareDateSchedule || data.status === "complete"
          ? "bg-stone-100"
          : "border-stone-100 bg-white shadow hover:cursor-pointer hover:shadow-lg dark:border-stone-700 dark:hover:border-white",
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col items-center justify-center rounded-bl-lg rounded-tl-lg bg-stone-100 px-6 py-3",
        )}
      >
        <span className="font-title text-xl">
          {format(data.scheduleAt, "dd")}
        </span>
        <span className="text-xs font-light lowercase">
          {format(data.scheduleAt, "LLL", { locale: ptBR })}
        </span>
        <span className="text-xs font-light">
          {format(data.scheduleAt, "yy")}
        </span>
      </div>
      <div className="flex w-full items-center justify-between gap-6  pr-6">
        <div className="flex items-center gap-6">
          <span className="hidden rounded-full bg-stone-100 p-3 md:block">
            {data.type === "post" && <Newspaper />}
            {data.type === "product" && <ShoppingCart />}
            {data.type === "page" && <Layout />}
            {data.type === "social" && <Share2 />}
          </span>
          <div className="flex flex-col">
            <h1 className="flex items-center gap-2 font-title text-sm text-stone-900">
              {data.type}{" "}
              {data.status === "complete" ? (
                <Link
                  href={`/${data.type}/${data.refId}`}
                  className="flex items-center gap-1 font-title text-sm underline"
                >
                  <ExternalLink size={16} />
                </Link>
              ) : (
                <span className="text-xs font-light text-stone-400 underline">
                  em breve link disponível
                </span>
              )}
            </h1>
            <p className="line-clamp-2 text-xs text-stone-900 ">
              {data.description}
            </p>
          </div>
        </div>
        <PlanningStatus status={data.status!} />
      </div>
    </div>
  );
}
