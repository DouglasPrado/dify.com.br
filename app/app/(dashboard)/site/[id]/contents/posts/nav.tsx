"use client";

import { cn } from "@/lib/utils";
import { BookOpen, Combine, LayoutListIcon, ScanBarcode } from "lucide-react";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export default function MediaNav() {
  const { id } = useParams() as { id?: string };
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: "Conteúdo",
      href: `/site/${id}/contents/posts`,
      segment: null,
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      name: "Lista",
      href: `/site/${id}/contents/posts/list`,
      segment: "list",
      icon: <LayoutListIcon className="h-4 w-4" />,
    },
    {
      name: "Comparação",
      href: `/site/${id}/contents/posts/compare`,
      segment: "compare",
      icon: <Combine className="h-4 w-4" />,
    },
    {
      name: "Review",
      href: `/site/${id}/contents/posts/review`,
      segment: "review",
      icon: <ScanBarcode className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex flex-col gap-3 border-b border-stone-200 py-4 lg:flex-row dark:border-stone-700">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          // Change style depending on whether the link is active
          className={cn(
            "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors active:bg-stone-200 dark:active:bg-stone-600",
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
