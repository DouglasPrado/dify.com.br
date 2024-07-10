"use client";

import { useModal } from "@/components/modal/provider";
import { cn } from "@/lib/utils";
import { Check, Loader, Plus } from "lucide-react";
import { ReactNode } from "react";

export default function MagicButton({
  children,
  status,
  check,
}: {
  children: ReactNode;
  status: boolean;
  check: boolean;
}) {
  const modal = useModal();

  return (
    <button
      onClick={() => modal?.show(children)}
      className={cn(
        check ? " bg-emerald-100" : "border hover:bg-stone-100",
        "flex h-[40px] w-[40px] items-center rounded-full  p-2",
      )}
    >
      {status ? (
        check ? (
          <Check width={32} className={cn("text-emerald-600")} />
        ) : (
          <Plus
            width={32}
            className={cn("text-stone-600 hover:text-stone-400")}
          />
        )
      ) : (
        <Loader
          width={32}
          className="animate-spin text-stone-600 hover:text-stone-400"
        />
      )}
    </button>
  );
}
