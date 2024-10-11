"use client";

import { cn } from "@/lib/utils";
import { Calendar, FileStack, Sparkles } from "lucide-react";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export default function PlanningNav() {
  const { id } = useParams() as { id?: string };
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: "Gerador de conteúdo",
      href: `/site/${id}/planning`,
      segment: null,
      icon: <Sparkles size={20} className="text-stone-800" />,
    },
    {
      name: "Conteúdo em massa",
      href: `/site/${id}/planning/launch`,
      segment: "launch",
      icon: <FileStack size={20} className="text-stone-800" />,
    },
    {
      name: "Calendário de conteúdo",
      href: `/site/${id}/planning/queues`,
      segment: "queues",
      icon: <Calendar size={20} className="text-stone-800" />,
    },
    // {
    //   name: "Artigos para revisão",
    //   href: `/site/${id}/settings`,
    //   segment: "settings",
    // },
  ];
  return (
    <div className="space-4 fixed hidden w-[220px] flex-col gap-3 sm:flex ">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          // Change style depending on whether the link is active
          className={cn(
            "flex items-center gap-3 rounded-md px-2 py-3 text-sm font-medium transition-colors active:bg-stone-200 dark:active:bg-stone-600",
            segment === item.segment
              ? "bg-stone-900 text-white dark:bg-stone-800 dark:text-stone-400"
              : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800",
          )}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </div>
  );
}
