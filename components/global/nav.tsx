"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useSiteStore } from "@/lib/stores/SiteStore";
import {
  ArrowLeft,
  BarChart3,
  Bolt,
  Book,
  ChevronsUpDown,
  Clapperboard,
  DraftingCompass,
  Edit3,
  Edit3Icon,
  LayoutDashboard,
  LayoutTemplate,
  Leaf,
  ListTodo,
  Menu,
  PackageSearch,
  PenTool,
  PlaySquare,
  Share2,
  ShipWheel,
  Star,
  Telescope,
  UserSquare,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const externalLinks: any = [
  // {
  //   name: "Leia a documentação",
  //   href: "https://www.notion.so/douglasprado/dify-neg-cios-digitais-17ae1474b8de43d786771872c16e8212",
  //   icon: <Megaphone width={18} />,
  // },
];

export default function Nav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const pathname = usePathname();
  const { id } = useParams() as { id?: string };
  const [siteId, getSiteId, site] = useSiteStore((state) => [
    state.siteId,
    state.getSiteId,
    state.site,
  ]);

  useEffect(() => {
    getSiteId(segments, id, siteId);
  }, [getSiteId, id, segments, siteId]);

  const tabs = useMemo(() => {
    if (segments[0] === "site" && id) {
      return [
        // {
        //   name: "Feed",
        //   href: `/site/${id}`,
        //   isActive: segments[2] === "feed",
        //   icon: <Rss width={18} />,
        // },
        // {
        //   name: "Visão geral",
        //   href: `/site/${id}`,
        //   isActive: segments.length === 2,
        //   icon: <LayoutDashboard width={18} />,
        // },
        // {
        //   name: "Estatísticas",
        //   href: `/site/${id}/analytics`,
        //   isActive: segments[2] === "analytics",
        //   icon: <BarChart3 width={18} />,
        // },
        {
          name: "Visão geral",
          href: `/site/${id}/planning`,
          isActive: segments[2] === "planning",
          icon: <LayoutDashboard width={18} />,
        },
        {
          name: "Exporar",
          href: `/site/${id}/explorer`,
          isActive: segments[2] === "explorer",
          icon: <Telescope width={18} />,
        },
        {
          name: "Navegação",
          href: `/site/${id}/navigation`,
          isActive: segments[2] === "navigation",
          icon: <ShipWheel width={18} />,
        },
        {
          name: "Conteúdo",
          href: `/site/${id}/contents`,
          isActive: segments[2] === "contents",
          icon: <PenTool width={18} />,
        },
        {
          name: "Vendas",
          href: `/site/${id}/sales`,
          isActive: segments[2] === "sales",
          icon: <PackageSearch width={18} />,
        },
        {
          name: "Conhecimento",
          href: `/site/${id}/knowledge`,
          isActive: segments[2] === "knowledge",
          icon: <Book width={18} />,
        },
        // {
        //   name: "Links",
        //   href: `/site/${id}/links`,
        //   isActive: segments[2] === "links",
        //   icon: <QrCode width={18} />,
        // },
        {
          name: "Galeria",
          href: `/site/${id}/media`,
          icon: <PlaySquare width={18} />,
        },
        // {
        //   name: "Automação",
        //   href: `/site/${id}/pages`,
        //   isActive: segments[2] === "automations",
        //   icon: <Combine width={18} />,
        // },
        // {
        //   name: "Integrações",
        //   href: `/site/${id}/integrations`,
        //   icon: <Blocks width={18} />,
        // },
        {
          name: "Configurações",
          href: `/site/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Bolt width={18} />,
        },
      ];
    } else if (segments[0] === "contact" && id) {
      return [
        {
          name: "Voltar",
          href: siteId ? `/site/${siteId}` : "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Contatos",
          href: `/post/${id}`,
          isActive: segments.length === 2,
          icon: <UserSquare width={18} />,
        },
      ];
    } else if (segments[0] === "post" && id) {
      return [
        {
          name: "Voltar",
          href: siteId ? `/site/${siteId}/contents/posts` : "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Studio",
          href: `/post/${id}`,
          isActive: segments.length === 2,
          icon: <DraftingCompass width={18} />,
        },
        {
          name: "Templates",
          href: `/post/${id}/settings/template`,
          isActive: segments.includes("template"),
          icon: <LayoutTemplate width={18} />,
        },
        {
          name: "Conhecimento",
          href: `/post/${id}/settings/knowledge`,
          isActive: segments.includes("references"),
          icon: <Book width={18} />,
        },
        {
          name: "SEO",
          href: `/post/${id}/settings/seo`,
          isActive: segments.includes("seo"),
          icon: <Zap width={18} />,
        },
      ];
    } else if (segments[0] === "tunning" && id) {
      return [
        {
          name: "Voltar",
          href: siteId ? `/site/${siteId}/contents/tunning` : "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editar",
          href: `/tunning/${id}`,
          isActive: segments.length === 2,
          icon: <Edit3Icon width={18} />,
        },
        // {
        //   name: "Configurações",
        //   href: `/post/${id}/settings`,
        //   isActive: segments.includes("settings"),
        //   icon: <Bolt width={18} />,
        // },
      ];
    } else if (segments[0] === "page" && id) {
      return [
        {
          name: "Voltar",
          href: siteId ? `/site/${siteId}` : "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editar",
          href: `/page/${id}`,
          isActive: segments.length === 2,
          icon: <Edit3 width={18} />,
        },
        {
          name: "Configurações",
          href: `/page/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Bolt width={18} />,
        },
      ];
    } else if (segments[0] === "product" && id) {
      return [
        {
          name: "Voltar",
          href: siteId ? `/site/${siteId}/sales/products` : "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editar",
          href: `/product/${id}`,
          isActive: segments.length === 2,
          icon: <Edit3 width={18} />,
        },
        {
          name: "Mídia",
          href: `/product/${id}/medias`,
          isActive: segments.includes("media"),
          icon: <Clapperboard width={18} />,
        },
        {
          name: "Especifícações",
          href: `/product/${id}/features`,
          isActive: segments.includes("features"),
          icon: <ListTodo width={18} />,
        },
        {
          name: "Avaliações",
          href: `/product/${id}/reviews`,
          isActive: segments.includes("availables"),
          icon: <Star width={18} />,
        },
        {
          name: "Configurações",
          href: `/product/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Bolt width={18} />,
        },
      ];
    } else if (segments[0] === "collection" && id) {
      return [
        {
          name: "Voltar",
          href: siteId ? `/site/${siteId}/navigation/collections` : "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editar",
          href: `/collection/${id}`,
          isActive: segments.length === 2,
          icon: <Edit3 width={18} />,
        },
        {
          name: "Otimização (SEO)",
          href: `/collection/${id}/seo`,
          isActive: segments.includes("seo"),
          icon: <Zap width={18} />,
        },
        {
          name: "Configurações",
          href: `/collection/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Bolt width={18} />,
        },
      ];
    } else if (segments[0] === "category" && id) {
      return [
        {
          name: "Voltar",
          href: siteId ? `/site/${siteId}/navigation/categories` : "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editar",
          href: `/category/${id}`,
          isActive: segments.length === 2,
          icon: <Edit3 width={18} />,
        },
        {
          name: "Configurações",
          href: `/category/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Bolt width={18} />,
        },
      ];
    } else if (segments[0] === "social" && id) {
      return [
        {
          name: "Voltar",
          href: siteId ? `/site/${siteId}/contents` : "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editar",
          href: `/social/${id}`,
          isActive: segments.length === 2,
          icon: <Edit3 width={18} />,
        },
        {
          name: "Configurações",
          href: `/social/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Bolt width={18} />,
        },
      ];
    } else if (segments[0] === "columnist" && id) {
      return [
        {
          name: "Voltar",
          href: siteId ? `/site/${siteId}/columnist` : "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editar",
          href: `/columnist/${id}`,
          isActive: segments.length === 2,
          icon: <Edit3 width={18} />,
        },
        {
          name: "Redes sociais",
          href: `/columnist/${id}/socials`,
          isActive: segments.includes("socials"),
          icon: <Share2 width={18} />,
        },
        {
          name: "Configurações",
          href: `/columnist/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Bolt width={18} />,
        },
      ];
    } else if (segments[0] === "planning" && id) {
      return [
        {
          name: "Voltar",
          href: "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editar",
          href: `/launch/${id}`,
          isActive: segments.length === 2,
          icon: <Edit3 width={18} />,
        },
      ];
    } else if (segments[0] === "launch" && id) {
      return [
        {
          name: "Voltar",
          href: siteId ? `/site/${siteId}/planning/launch` : "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Estatísticas",
          href: `/launch/${id}/analytics`,
          isActive: segments.length === 2,
          icon: <BarChart3 width={18} />,
        },
        {
          name: "Editar",
          href: `/launch/${id}/details`,
          isActive:
            segments.includes("details") ||
            segments.includes("campaign") ||
            segments.includes("settings"),
          icon: <Edit3 width={18} />,
        },
      ];
    } else if (segments[0] === "link" && id) {
      return [
        {
          name: "Voltar",
          href: siteId ? `/site/${siteId}/links` : "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Estatísticas",
          href: `/link/${id}/analytics`,
          isActive: segments[2] === "analytics",
          icon: <BarChart3 width={18} />,
        },
        {
          name: "Editar",
          href: `/link/${id}`,
          isActive: segments.length === 2,
          icon: <Edit3 width={18} />,
        },
        {
          name: "Sessões",
          href: `/link/${id}/sections`,
          isActive: segments.includes("sections"),
          icon: <LayoutTemplate width={18} />,
        },
      ];
    } else if (segments[0] === "template" && id) {
      return [
        {
          name: "Voltar",
          href: siteId ? `/site/${siteId}/sales/templates` : "/sites",
          icon: <ArrowLeft width={18} />,
        },
      ];
    }

    return [
      {
        name: "Visão geral",
        href: "/",
        isActive: segments.length === 0,
        icon: <LayoutDashboard width={18} />,
      },
      {
        name: "Projetos",
        href: "/sites",
        isActive: segments[0] === "sites",
        icon: <Leaf width={18} />,
      },
      {
        name: "Configurações",
        href: "/settings",
        isActive: segments[0] === "settings",
        icon: <Bolt width={18} />,
      },
    ];
  }, [segments, id, siteId]);

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    !segments.includes("create") && (
      <>
        <button
          className={`fixed z-20 rounded-full bg-stone-100 p-2 ${
            // left align for Editor, right align for other pages
            segments[0] === "post" && segments.length === 2 && !showSidebar
              ? "left-5 top-5"
              : "right-5 top-7"
          } sm:hidden`}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Menu width={20} />
        </button>
        <div
          className={`transform ${
            showSidebar ? "w-full translate-x-0" : "-translate-x-full"
          } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all sm:w-60 sm:translate-x-0 dark:border-stone-700 dark:bg-stone-900`}
        >
          <div className="grid gap-2">
            <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
              <Link
                href="/"
                className="rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-stone-700"
              >
                <Image
                  src="/logo.png"
                  width={50}
                  height={24}
                  alt="Logo"
                  className="dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
                />
              </Link>
            </div>
            <div className="grid gap-3">
              {segments[0] === "site" && id && (
                <div className="mb-4 ">
                  <Menubar className="h-full w-full cursor-pointer shadow-sm transition-all hover:shadow-md">
                    <MenubarMenu>
                      <MenubarTrigger className="flex w-full cursor-pointer items-center justify-between gap-1 p-0.5">
                        <div className="flex items-center gap-3 ">
                          <Avatar>
                            <AvatarImage
                              src={site?.favicon}
                              alt={"Card thumbnail"}
                            />
                            <AvatarFallback className="bg-black uppercase text-white">
                              {site?.name?.slice(0, 2) || "PJ"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col items-start">
                            <h3 className="line-clamp-1 text-start font-cal text-xs">
                              {site?.name || "Carregando..."}
                            </h3>
                            <span className="flex items-center gap-1 text-xs font-light text-stone-400">
                              <PenTool size={14} /> {site?._count?.posts || "0"}{" "}
                              conteúdos
                            </span>
                          </div>
                        </div>
                        <ChevronsUpDown className="text-stone-600" size={18} />
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>
                          <strong className="line-clamp-1 font-cal text-sm uppercase">
                            {site?.name}
                          </strong>
                        </MenubarItem>
                        <MenubarSeparator />
                        <Link href={`/sites`}>
                          <MenubarItem>Alternar projeto</MenubarItem>
                        </Link>
                        <MenubarItem>
                          Novo projeto <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                          <Link href={`/settings`}>Ver perfil</Link>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Sair</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </div>
              )}
              {tabs.map(({ name, href, isActive, icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center space-x-3 ${
                    isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                  } rounded-lg px-2 py-2 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
                >
                  {icon}
                  <span className="text-sm font-medium text-stone-700">
                    {name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="grid gap-1">
              {externalLinks.map(({ name, href, icon }: any) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
                >
                  <div className="flex items-center space-x-3">
                    {icon}
                    <span className="text-sm font-medium">{name}</span>
                  </div>
                  <p>↗</p>
                </a>
              ))}
            </div>
            <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
            {children}
          </div>
        </div>
      </>
    )
  );
}
