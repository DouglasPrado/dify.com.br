"use client";

import { useModal } from "@/components/modal/provider";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function CreatePlanningButton({
  children,
  icon,
  title,
  description,
  color,
}: {
  children: ReactNode;
  icon: any;
  title: string;
  description: string;
  color: string;
}) {
  const modal = useModal();
  return (
    <button onClick={() => modal?.show(children)}>
      <div
        className={cn(
          "flex h-full flex-col items-start justify-start gap-6 rounded-xl p-6 transition-all duration-200 hover:-translate-y-1",
          `bg-${color}-100 hover:bg-${color}-200 hover:bg-opacity-65`,
        )}
      >
        <span className={cn("rounded-full p-3", `bg-black`)}>{icon}</span>
        <div className="flex flex-col items-start">
          <h1 className={cn("font-title text-lg", `text-black`)}>{title}</h1>
          <p className={cn("text-left text-lg font-light", `text-black`)}>
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}
