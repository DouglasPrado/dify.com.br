"use client";

import { cn } from "@/lib/utils";
import {
  Cherry,
  Filter,
  MessageCircle,
  Send,
  Store,
  Users,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export default function ManageNav() {
  const { id } = useParams() as { id?: string };
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: "Meus pedidos",
      description:
        "Crie conteúdo estratégico para impulsionar sua autoridade online e fortalecer sua presença nos motores de busca (SEO).",
      href: `/site/${id}/contents/posts`,
      segment: "posts",
      icon: <Store />,
    },
    {
      name: "Assinaturas",
      description:
        "Crie conteúdo estratégico para impulsionar sua autoridade online e fortalecer sua presença nos motores de busca (SEO).",
      href: `/site/${id}/contents/posts`,
      segment: "posts",
      icon: <Cherry />,
    },
    {
      name: "Pagamentos",
      description:
        "Crie conteúdo estratégico para impulsionar sua autoridade online e fortalecer sua presença nos motores de busca (SEO).",
      href: `/site/${id}/contents/posts`,
      segment: "posts",
      icon: <WalletCards />,
    },
    {
      name: "Clientes",
      description:
        "Crie conteúdo estratégico para impulsionar sua autoridade online e fortalecer sua presença nos motores de busca (SEO).",
      href: `/site/${id}/contents/posts`,
      segment: "posts",
      icon: <Users />,
    },
    {
      name: "Leads",
      description:
        "Crie conteúdo estratégico para impulsionar sua autoridade online e fortalecer sua presença nos motores de busca (SEO).",
      href: `/site/${id}/contents/posts`,
      segment: "posts",
      icon: <Filter />,
    },
    {
      name: "Comentários",
      description:
        "Crie conteúdo estratégico para impulsionar sua autoridade online e fortalecer sua presença nos motores de busca (SEO).",
      href: `/site/${id}/contents/posts`,
      segment: "posts",
      icon: <MessageCircle />,
    },
    {
      name: "Atendimento",
      description:
        "Crie conteúdo estratégico para impulsionar sua autoridade online e fortalecer sua presença nos motores de busca (SEO).",
      href: `/site/${id}/contents/posts`,
      segment: "posts",
      icon: <Send />,
    },
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
