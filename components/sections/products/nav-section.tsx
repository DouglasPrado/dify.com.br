"use client"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Category, Collection } from "@prisma/client";

import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
interface NavSectionProps {
  logo: string;
  categories: any;
}

export default function NavSection({ logo, categories }: NavSectionProps) {

  return (
    <div className="flex w-full items-center justify-center shadow-lg shadow-stone-200/50">
      <nav className="top-0 mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-6 lg:mx-0 lg:justify-between lg:px-6 lg:py-6">
        <Link href={"/"} className="w-[150px] cursor-pointer object-contain">
          {logo ? (
            <Image
              alt={`[${logo}]` ?? "Logo "}
              height={30}
              src={logo}
              width={70}
              className="h-[30px] w-[70px]"
            />
          ) : (
            <div className="absolute flex h-full w-full select-none items-center justify-center bg-stone-100 text-4xl text-stone-500">
              ?
            </div>
          )}
        </Link>
        <div className="hidden gap-6 lg:flex w-full">
        <NavigationMenu >
          <NavigationMenuList>
            {categories?.map(((category: Category & { collections: Collection []; _count: { collections: number} }, idx: number) => category._count.collections > 0 && <NavigationMenuItem key={`nav-item-${idx}`}>
              <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {category?.collections?.map((collection: Collection, idxCollection: number) => (
                    <NavigationMenuLink 
                      href={`/collection/${collection.slug}`}
                      key={`key-${collection?.name}-${idxCollection}`}
                      
                    >
                      <div className="flex flex-col items-start gap-1 hover:bg-stone-100 rounded p-2">
                        <h4 className="text-sm font-medium text-stone-700">{collection?.name || ""}</h4>
                        <p className="text-xs font-light text-stone-400">{collection?.shortDescription || ""}</p>
                      </div>
                    </NavigationMenuLink>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>)) }
          </NavigationMenuList>
        </NavigationMenu>
        </div>
        
        <Link className="" href={"/search"}>
          <SearchIcon />
        </Link>
      </nav>
    </div>
  );
}
