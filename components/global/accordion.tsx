"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Accordion({ title, description }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full overflow-hidden shadow-lg">
      <input
        id={`expandCollapse-${title}`}
        checked={open}
        type="checkbox"
        className="peer sr-only"
      />
      <label
        htmlFor={`expandCollapse-${title}`}
        className={cn(
          "flex w-full cursor-pointer items-center justify-center rounded-lg bg-stone-50 px-3 py-4 text-stone-700 lg:px-6",
          "transition-colors duration-700 ease-in-out",
        )}
        onClick={() => setOpen(!open)}
      >
        <div
          className={`flex w-full items-center justify-between gap-3 font-title text-sm`}
        >
          {title}
        </div>
        <ChevronDown
          size={28}
          className={cn("ml-4 rotate-0 transition duration-700 ease-in-out", {
            "rotate-180 transition duration-700 ease-in-out": open,
          })}
        />
      </label>
      <div
        className={cn(
          "flex h-0 flex-col items-start justify-center overflow-hidden bg-white",
          "peer-checked:h-[120px]",
          "transition-[height] duration-1000 ease-in-out ",
        )}
      >
        <p className="overflow-hidden px-6 text-left text-xs text-gray-700 lg:px-12">
          {description}
        </p>
      </div>
    </div>
  );
}
