"use client";

import { useModal } from "@/components/modal/provider";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function CreateProductButton({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const modal = useModal();
  return (
    <button onClick={() => modal?.show(children)}>
      <div
        className={cn(
          "flex items-center justify-center space-x-2 rounded-lg border px-6 py-2 text-sm transition-all focus:outline-none",
          "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
        )}
      >
        <span>{title}</span>
      </div>
    </button>
  );
}
