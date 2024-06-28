"use client";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegments } from "next/navigation";
import { ReactNode } from "react";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  return (
    <div
      className={cn(
        "min-h-screen bg-stone-50/50 dark:bg-black",
        !segments?.includes("create") ? "sm:pl-60" : "sm:pl-0",
      )}
    >
      {children}
    </div>
  );
}
