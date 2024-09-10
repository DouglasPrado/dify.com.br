"use client";

import type { Media, ProductSections, Site } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

interface FooterSectionProps {
  data: {
    site: Site & { colors: any };
    sections?: ProductSections[] & { medias: Media[] };
  };
}

export default function CookieSection({ data }: FooterSectionProps) {
  const [enableCookie, setEnableCookie] = useState(false);
  return (
    !enableCookie && (
      <div
        className="top-0 flex w-full flex-col justify-between gap-3 px-6 py-3 lg:flex-row"
        style={{
          backgroundColor: data.site.colors.backgroundFooter,
          color: data.site.colors.colorContrastFooter,
        }}
      >
        <div className="flex flex-col">
          <h6 className="font-title text-sm">Cookies de navegação</h6>
          <p className="text-xs font-light">
            A {data.site.name} utiliza cookies de navegação.{" "}
            <Link href="/p/politica-de-privacidade" className="underline">
              politicas de privacidade
            </Link>
          </p>
        </div>

        <button
          onClick={() => setEnableCookie(true)}
          className="rounded-lg bg-white px-6 py-2 text-xs text-black hover:bg-gray-50"
        >
          Aceitar
        </button>
      </div>
    )
  );
}
