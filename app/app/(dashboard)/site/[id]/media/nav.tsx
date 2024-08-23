"use client";

import { cn } from "@/lib/utils";
import {
  Archive,
  AudioLines,
  FileText,
  UploadCloud,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export default function MediaNav() {
  const { id } = useParams() as { id?: string };
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: "Imagens",
      href: `/site/${id}/medias`,
      segment: null,
      icon: <UploadCloud width={16} />,
    },
    {
      name: "Vídeos",
      href: `/site/${id}/videos`,
      segment: "videos",
      icon: <Video width={16} />,
    },
    {
      name: "Áudios",
      href: `/site/${id}/audios`,
      segment: "audios",
      icon: <AudioLines width={16} />,
    },
    {
      name: "PDFs",
      href: `/site/${id}/pdfs`,
      segment: "pdfs",
      icon: <FileText width={16} />,
    },
    {
      name: "Arquivos",
      href: `/site/${id}/settings/archives`,
      segment: "archives",
      icon: <Archive width={16} />,
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
