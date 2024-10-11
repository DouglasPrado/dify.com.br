"use client";

import { cn } from "@/lib/utils";
import { Book, KeyRound, Orbit, Rss } from "lucide-react";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export default function SiteSettingsNav() {
  const { id } = useParams() as { id?: string };
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: "Conhecimento",
      href: `/site/${id}/explorer/settings`,
      segment: null,
      icon: <Book width={16} />,
    },
    {
      name: "Palavras chave",
      href: `/site/${id}/explorer/settings/keywords`,
      segment: "keywords",
      icon: <KeyRound width={16} />,
    },
    {
      name: "Concorrência",
      href: `/site/${id}/explorer/settings/competition`,
      segment: "competition",
      icon: <Orbit width={16} />,
    },
    {
      name: "Notícias",
      href: `/site/${id}/explorer/settings/news`,
      segment: "news",
      icon: <Rss width={16} />,
    },
  ];

  return (
    <div className="flex flex-col gap-3 border-b border-stone-200 pb-2 lg:flex-row dark:border-stone-700">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          // Change style depending on whether the link is active
          className={cn(
            "flex items-center gap-3 rounded-md px-2 py-1 text-sm font-medium transition-colors  active:bg-stone-400 dark:active:bg-stone-600",
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
