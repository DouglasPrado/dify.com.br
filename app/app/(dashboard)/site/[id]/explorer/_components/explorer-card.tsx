"use client";
import { useModal } from "@/components/modal/provider";
import { cn } from "@/lib/utils";
import { PenToolIcon } from "lucide-react";
import CreateExplorerModal from "./create-explorer-modal";

export default function ExplorerCard({ data }: { data: any }) {
  const modal = useModal();
  return (
    <div className="relative rounded-lg border border-stone-100/70 shadow-md shadow-stone-200/50 transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <button
        onClick={() => modal?.show(<CreateExplorerModal type={"type"} />)}
        className="flex flex-col overflow-hidden rounded-lg"
      >
        <div className="p-4 ">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "rounded-lg p-2",
                data.status === "PENDING"
                  ? "bg-amber-100"
                  : data.status === "IN_PROGRESS"
                  ? "bg-sky-100"
                  : data.status === "COMPLETED"
                  ? "bg-lime-100"
                  : "bg-stone-100",
              )}
            >
              <PenToolIcon size={22} />
            </div>
            <h3 className="my-0 line-clamp-2 text-left font-title text-sm font-bold tracking-wide text-stone-800 dark:text-white ">
              {data.title}
            </h3>
          </div>
          <p className="mt-4 line-clamp-3 text-left text-xs font-normal leading-snug text-stone-400 dark:text-stone-400">
            {data.description}
          </p>
        </div>
      </button>
    </div>
  );
}
