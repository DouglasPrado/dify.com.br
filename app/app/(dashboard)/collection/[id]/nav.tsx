"use client";

import { cn } from "@/lib/utils";
import {
  MousePointerClick,
  Newspaper,
  PackageSearch,
  PanelsTopLeft,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export default function CollectionNav() {
  const { id } = useParams() as { id?: string };
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: "Produtos",
      href: `/collection/${id}/products`,
      segment: null,
      icon: <PackageSearch width={16} />,
    },
    {
      name: "Artigos",
      href: `/collection/${id}/posts`,
      segment: "videos",
      icon: <Newspaper width={16} />,
    },
    {
      name: "Páginas",
      href: `/collection/${id}/pages`,
      segment: "audios",
      icon: <PanelsTopLeft width={16} />,
    },
    {
      name: "Botões",
      href: `/collection/${id}/buttons`,
      segment: "pdfs",
      icon: <MousePointerClick width={16} />,
    },
    {
      name: "Mídias sociais",
      href: `/collection/${id}/social`,
      segment: "archives",
      icon: <ThumbsUp width={16} />,
    },
  ];

  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 pt-2 lg:flex-row dark:border-slate-700">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          // Change style depending on whether the link is active
          className={cn(
            "flex items-center gap-3 rounded-md px-2 py-1 text-sm font-medium transition-colors active:bg-slate-200 dark:active:bg-slate-600",
            segment === item.segment
              ? "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
          )}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </div>
  );
}
