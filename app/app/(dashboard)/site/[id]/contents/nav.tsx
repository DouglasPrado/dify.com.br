"use client";

import { cn } from "@/lib/utils";
import {
  // EyeOff,
  Layout,
  LucideLibrary,
  SlidersVertical,
  SmilePlus,
} from "lucide-react";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export default function SiteContentssNav() {
  const { id } = useParams() as { id?: string };
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: "Conteúdo",
      description:
        "Crie conteúdo estratégico para impulsionar sua autoridade online e fortalecer sua presença nos motores de busca (SEO).",
      href: `/site/${id}/contents/posts`,
      segment: "posts",
      icon: <LucideLibrary />,
    },
    // {
    //   name: "Conteúdo privado",
    //   description:
    //     "Desenvolva conteúdo exclusivo! Apenas usuários registrados têm acesso privilegiado a esse material.",
    //   href: `/site/${id}/contents/socials`,
    //   segment: "socials",
    //   icon: <EyeOff />,
    // },
    {
      name: "Páginas",
      description:
        "Elabore coleções envolventes de conteúdos e produtos para destacar no menu principal.",
      href: `/site/${id}/contents/pages`,
      segment: "pages",
      icon: <Layout />,
    },
    // {
    //   name: "Redes Sociais",
    //   description:
    //     "Desenvolva conteúdos envolventes para diversas plataformas de mídia social, como Instagram, Facebook, Twitter/X, TikTok e outras.",
    //   href: `/site/${id}/contents/socials`,
    //   segment: "socials",
    //   icon: <ThumbsUp />,
    // },
    {
      name: "Autores",
      description:
        "Aprimore a página incluindo perfis detalhados e informações sobre os escritores que contribuem para o seu conteúdo.",
      href: `/site/${id}/contents/columnists`,
      segment: "columnists",
      icon: <SmilePlus />,
    },
    {
      name: "Fine Tunning",
      description:
        "Crie uma estrutura padronizada para o seu conteúdo, deixe seu conteúdo com seu estilo.",
      href: `/site/${id}/contents/tunning`,
      segment: "posts",
      icon: <SlidersVertical />,
    },
  ];

  return (
    <div className="grid grid-cols-1 items-center justify-center gap-6 sm:grid-cols-3">
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
          <span className="text-center text-sm font-light text-stone-600">
            {item.description}
          </span>
        </Link>
      ))}
    </div>
  );
}
