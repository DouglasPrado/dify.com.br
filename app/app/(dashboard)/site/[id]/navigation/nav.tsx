"use client";

import { cn } from "@/lib/utils";
import { LucideLibrary, Rows3 } from "lucide-react";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export default function SiteContentssNav() {
  const { id } = useParams() as { id?: string };
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: "Categorias",
      description:
        "Crie conteúdo estratégico para impulsionar sua autoridade online e fortalecer sua presença nos motores de busca (SEO).",
      href: `/site/${id}/navigation/categories`,
      segment: "posts",
      icon: <LucideLibrary />,
    },

    {
      name: "Coleções",
      description:
        "Crie uma estrutura padronizada para o seu conteúdo, deixe seu conteúdo com seu estilo.",
      href: `/site/${id}/navigation/collections`,
      segment: "posts",
      icon: <Rows3 />,
    },
  ];

  return (
    <div className="grid grid-cols-1 items-center justify-center gap-6 md:grid-cols-3">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          // Change style depending on whether the link is active
          className={cn(
            "flex w-full flex-col items-center justify-center gap-3 rounded-md p-4 font-medium transition-colors active:bg-stone-200 dark:active:bg-stone-600",
            segment === item.segment
              ? "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
              : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800",
          )}
        >
          {item.icon}
          <h1 className="font-title text-lg text-stone-800">{item.name}</h1>
          <span className="line-clamp-2 text-center text-sm font-light text-stone-600">
            {item.description}
          </span>
        </Link>
      ))}
    </div>
  );
}
