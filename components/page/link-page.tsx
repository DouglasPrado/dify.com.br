"use client";
import { Collection } from "@prisma/client";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import LinksSection from "../sections/links/links-section";
import LinkNavSection from "../sections/links/nav-section";

export default function LinkPage({ data }: { data: any }) {
  const { setTheme } = useTheme();
  useEffect(() => setTheme(data?.metadata?.theme));
  return (
    <div className="flex h-screen items-start bg-white dark:bg-black">
      {/* <CookieSection data={{ site: data }} /> */}
      <div className="mx-auto mb-6 flex w-full flex-col items-center justify-center bg-white px-3 dark:bg-black">
        {/* Navegação */}
        <LinkNavSection
          cover={data.image || data.site.image}
          name={data.name || data.site.name}
          description={data.description || data.site.description}
        />

        {data.collections?.map(
          (collection: Collection, idxCollection: number) => (
            <LinksSection
              key={`key-${collection.id}-${idxCollection}`}
              data={collection}
            />
          ),
        )}
      </div>
      {/* <FooterSection
        data={{
          colors: {
            backgroundFooter: data.colors["backgroundFooter"],
            colorContrastFooter: data.colors["colorContrastFooter"],
          },
          site: data,
        }}
      /> */}
    </div>
  );
}
