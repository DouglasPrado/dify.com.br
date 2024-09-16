"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Category, Collection } from "@prisma/client";

import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
interface NavSectionProps {
  name?: string;
  logo: { logo: string; config: { width: string; height: string } };
  categories: any;
}

export default function NavSection({
  name,
  logo,
  categories,
}: NavSectionProps) {
  return (
    <div className="flex w-full items-center justify-center shadow-lg shadow-stone-200/50">
      <nav className="top-0 mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-3 lg:mx-0 lg:justify-between lg:py-3 xl:px-0">
        <Link
          href={"/"}
          className="max-w-[150px] cursor-pointer object-contain"
        >
          {logo.logo ? (
            <Image
              alt={`[${logo.logo}]`}
              width={0}
              height={0}
              src={logo.logo}
              style={{ width: logo.config?.width || "120px", height: "auto" }}
              // className="h-[30px] w-[70px]"
            />
          ) : (
            name && (
              <div className="flex h-full w-[120px] select-none items-center justify-center font-cal text-xl text-stone-800">
                {name}
              </div>
            )
          )}
        </Link>
        <div className="hidden w-full gap-6 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {categories?.map(
                (
                  category: Category & {
                    collections: Collection[];
                    _count: { collections: number };
                  },
                  idx: number,
                ) =>
                  category._count.collections > 0 && (
                    <NavigationMenuItem key={`nav-item-${idx}`}>
                      <NavigationMenuTrigger>
                        {category.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {category?.collections?.map(
                            (collection: Collection, idxCollection: number) => (
                              <NavigationMenuLink
                                href={`/c/${collection.slug}`}
                                key={`key-${collection?.name}-${idxCollection}`}
                              >
                                <div className="flex flex-col items-start gap-1 rounded p-2 hover:bg-stone-100">
                                  <h4 className="text-sm font-medium text-stone-700">
                                    {collection?.name || ""}
                                  </h4>
                                  <p className="text-xs font-light text-stone-400">
                                    {collection?.shortDescription || ""}
                                  </p>
                                </div>
                              </NavigationMenuLink>
                            ),
                          )}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ),
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Link className="" href={"/search"} title="pesquisar conteúdo">
          <SearchIcon />
        </Link>
      </nav>
    </div>
  );
}
