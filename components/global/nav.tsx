"use client";

import {
  getSiteFromClusterId,
  getSiteFromCollectionId,
  getSiteFromPageId,
  getSiteFromPostId,
  getSiteFromProductId,
} from "@/lib/actions";
import { getSiteFromLaunchId } from "@/lib/actions/launch";
import { getSiteFromLinkId } from "@/lib/actions/links";
import { getSiteFromQueueId } from "@/lib/actions/queues";
import {
  ArrowLeft,
  BarChart3,
  Blocks,
  Bolt,
  Clapperboard,
  Edit3,
  GalleryVerticalEnd,
  LayoutDashboard,
  LayoutTemplate,
  Leaf,
  LifeBuoy,
  Menu,
  Newspaper,
  PlaySquare,
  Rabbit,
  Rows3,
  Share2,
  Star,
  UserSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";

const externalLinks: any = [
  // {
  //   name: "Leia a documentação",
  //   href: "https://www.notion.so/douglasprado/dify-neg-cios-digitais-17ae1474b8de43d786771872c16e8212",
  //   icon: <Megaphone width={18} />,
  // },
];

export default function Nav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };

  const [siteId, setSiteId] = useState<string | null>();
  useEffect(() => {
    if (segments[0] === "post" && id) {
      getSiteFromPostId(id).then((id: any) => {
        setSiteId(id);
      });
    }
    if (segments[0] === "planning" && id) {
      getSiteFromQueueId(id).then((id: any) => {
        setSiteId(id);
      });
    }
    if (segments[0] === "launch" && id) {
      getSiteFromLaunchId(id).then((id: any) => {
        setSiteId(id);
      });
    }
    if (segments[0] === "page" && id) {
      getSiteFromPageId(id).then((id: any) => {
        setSiteId(id);
      });
    }

    if (segments[0] === "product" && id) {
      getSiteFromProductId(id).then((id: any) => {
        setSiteId(id);
      });
    }
    if (segments[0] === "clusters" && id) {
      getSiteFromClusterId(id).then((id: any) => {
        setSiteId(id);
      });
    }
    if (segments[0] === "social" && id) {
      getSiteFromClusterId(id).then((id: any) => {
        setSiteId(id);
      });
    }
    if (segments[0] === "link" && id) {
      getSiteFromLinkId(id).then((id: any) => {
        setSiteId(id);
      });
    }
    if (segments[0] === "collection" && id) {
      getSiteFromCollectionId(id).then((id: any) => {
        setSiteId(id);
      });
    }
  }, [segments, id]);

  const tabs = useMemo(() => {
    if (segments[0] === "site" && id) {
      return [
        {
          name: "Voltar",
          href: "/sites",
          icon: <ArrowLeft width={18} />,
        },
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
          name: "Coleções",
          href: `/site/${id}/collections`,
          isActive: segments[2] === "collections",
          icon: <Rows3 width={18} />,
        },
        // {
        //   name: "Vendas",
        //   href: `/site/${id}/sales`,
        //   isActive: segments[2] === "sales",
        //   icon: <PackageSearch width={18} />,
        // },

        {
          name: "Conteúdo",
          href: `/site/${id}/contents`,
          isActive: segments[2] === "contents",
          icon: <Newspaper width={18} />,
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
          name: "Construtor",
          href: `/post/${id}`,
          isActive: segments.length === 2,
          icon: <Blocks width={18} />,
        },
        {
          name: "Configurações",
          href: `/post/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Bolt width={18} />,
        },
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
          name: "Variações",
          href: `/product/${id}/attributes`,
          isActive: segments.includes("attributes"),
          icon: <GalleryVerticalEnd width={18} />,
        },
        {
          name: "Mídia",
          href: `/product/${id}/medias`,
          isActive: segments.includes("media"),
          icon: <Clapperboard width={18} />,
        },
        {
          name: "Avaliações",
          href: `/product/${id}/reviews`,
          isActive: segments.includes("availables"),
          icon: <Star width={18} />,
        },
        {
          name: "Perguntas frequentes",
          href: `/product/${id}/faqs`,
          isActive: segments.includes("faqs"),
          icon: <LifeBuoy width={18} />,
        },
        {
          name: "Campanhas",
          href: `/product/${id}/campaigns`,
          isActive: segments.includes("campaigns"),
          icon: <Rabbit width={18} />,
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
          href: siteId ? `/site/${siteId}/collections` : "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editar",
          href: `/collection/${id}`,
          isActive: segments.length === 2,
          icon: <Edit3 width={18} />,
        },
        {
          name: "Configurações",
          href: `/collection/${id}/settings`,
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

  const pathname = usePathname();

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
            <div className="grid gap-1">
              {tabs.map(({ name, href, isActive, icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center space-x-3 ${
                    isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                  } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
                >
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
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
