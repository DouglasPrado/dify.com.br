"use client";

import { cn } from "@/lib/utils";
import { FerrisWheel, Globe, Palette, Share2, User2 } from "lucide-react";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export default function SiteSettingsNav() {
  const { id } = useParams() as { id?: string };
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: "Geral",
      href: `/site/${id}/settings`,
      segment: null,
      icon: <FerrisWheel width={16} />,
    },
    {
      name: "Domínio",
      href: `/site/${id}/settings/domains`,
      segment: "domains",
      icon: <Globe width={16} />,
    },
    {
      name: "Aparencia",
      href: `/site/${id}/settings/appearance`,
      segment: "appearance",
      icon: <Palette width={16} />,
    },
    {
      name: "Redes sociais",
      href: `/site/${id}/settings/social-network`,
      segment: "social-network",
      icon: <Share2 width={16} />,
    },
    {
      name: "Contatos",
      href: `/site/${id}/settings/contacts`,
      segment: "contacts",
      icon: <User2 width={16} />,
    },
  ];

  return (
    <div className="border-stpne-200 dark:border-stpne-700 flex flex-col gap-3 border-b pb-4 pt-2 lg:flex-row">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          // Change style depending on whether the link is active
          className={cn(
            "active:bg-stpne-200 dark:active:bg-stpne-600 flex items-center gap-3 rounded-md px-2 py-1 text-sm font-medium transition-colors",
            segment === item.segment
              ? "bg-stpne-200 text-stpne-600 dark:bg-stpne-800 dark:text-stpne-400"
              : "text-stpne-600 hover:bg-stpne-100 dark:text-stpne-400 dark:hover:bg-stpne-800",
          )}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </div>
  );
}
