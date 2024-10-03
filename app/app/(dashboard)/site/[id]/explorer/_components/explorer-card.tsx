"use client";
import { useModal } from "@/components/modal/provider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Book,
  CalendarClock,
  LayoutTemplate,
  List,
  PenToolIcon,
  PlayIcon,
} from "lucide-react";
import CreateExplorerCalendarModal from "./create-explorer-calendar-modal";
import CreateExplorerModal from "./create-explorer-modal";

export default function ExplorerCard({ data }: { data: any }) {
  const modal = useModal();
  return (
    <div className="relative rounded-lg border border-stone-100/70 shadow-md shadow-stone-200/50 transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
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
        <div className="flex items-center justify-center gap-3 ">
          <p className="mt-4 line-clamp-3 text-left text-xs font-normal leading-snug text-stone-400 dark:text-stone-400">
            {data.description}
          </p>
        </div>
        <div className="mt-2 flex justify-between rounded-lg bg-stone-100 p-2">
          <div className="flex gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => modal?.show(<CreateExplorerModal />)}
                  className="flex h-5 w-5 flex-col items-center justify-center rounded-full bg-stone-200/80 p-1 hover:bg-emerald-300 hover:text-white"
                >
                  <PlayIcon size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-light">Gerar conteúdo</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => modal?.show(<CreateExplorerCalendarModal />)}
                  className="flex h-5 w-5 flex-col items-center justify-center rounded-full bg-stone-200/80 p-1 hover:bg-emerald-300 hover:text-white"
                >
                  <CalendarClock size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-light">Agendar publicação</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => modal?.show(<CreateExplorerCalendarModal />)}
                  className="flex h-5 w-5 flex-col items-center justify-center rounded-full bg-stone-200/80 p-1 hover:bg-emerald-300 hover:text-white"
                >
                  <List size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-light">Estruturar conteúdo</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => modal?.show(<CreateExplorerCalendarModal />)}
                  className="flex h-5 w-5 flex-col items-center justify-center rounded-full bg-stone-200/80 p-1 hover:bg-emerald-300 hover:text-white"
                >
                  <Book size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-light">Adicionar conhecimento</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => modal?.show(<CreateExplorerCalendarModal />)}
                  className="flex h-5 w-5 flex-col items-center justify-center rounded-full bg-stone-200/80 p-1 hover:bg-emerald-300 hover:text-white"
                >
                  <LayoutTemplate size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-light">Alterar template</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
