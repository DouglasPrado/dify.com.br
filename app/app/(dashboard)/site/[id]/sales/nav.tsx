"use client";

import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export default function SiteSalesNav() {
  const { id } = useParams() as { id?: string };
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: "Produtos",
      description:
        "Adicione novos produtos à plataforma para apresentar suas ofertas aos clientes. ",
      href: `/site/${id}/sales/products`,
      segment: "products",
      icon: <ShoppingBag />,
    },
    // {
    //   name: "Serviços",
    //   description:
    //     "Desenvolva uma página de destino simples para promover seus serviços e facilitar a conversão por meio do WhatsApp.",
    //   href: `/site/${id}/sales/products`,
    //   segment: "products",
    //   icon: <PocketKnife />,
    // },
    // {
    //   name: "Afiliados",
    //   description:
    //     "Administre seus afiliados de plataformas como Amazon, Americanas, Shopee, Aliexpress, e outras.",
    //   href: `/site/${id}/contents/posts`,
    //   segment: "posts",
    //   icon: <LinkIcon />,
    // },
    // {
    //   name: "Área de membros",
    //   description:
    //     "Faça conteúdos organizados e venda o conteúdo em forma de assinatura. Cursos, Analises, Ebooks, Videos exclusivos e etc.",
    //   href: `/site/${id}/contents/posts`,
    //   segment: "posts",
    //   icon: <UsersRound />,
    // },
  ];

  return (
    <div className="grid grid-cols-3 items-center justify-center gap-6">
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
