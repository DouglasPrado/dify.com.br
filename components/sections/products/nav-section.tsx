import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NavSectionProps {
  logo: string;
  collections: any;
}

export default function NavSection({ logo, collections }: NavSectionProps) {
  return (
    <nav className="top-0 mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-6 lg:mx-0 lg:justify-between lg:px-0 lg:py-6">
      <Link href={"/"} className="w-32 cursor-pointer object-contain">
        {logo ? (
          <Image
            alt={`[${logo}]` ?? "Logo "}
            height={130}
            src={logo}
            width={300}
          />
        ) : (
          <div className="absolute flex h-full w-full select-none items-center justify-center bg-stone-100 text-4xl text-stone-500">
            ?
          </div>
        )}
      </Link>

      <ul className="hidden gap-6 lg:flex ">
        {collections.map(
          (collection: any, idxCollection: number) =>
            (collection?._count?.posts > 0 ||
              collection?._count?.products > 0) && (
              <li
                key={idxCollection}
                className="cursor-pointer font-cal hover:underline"
              >
                <Link href={`/collection/${collection.slug}`}>
                  {collection.name}
                </Link>
              </li>
            ),
        )}
      </ul>
      <Link className="" href={"/search"}>
        <SearchIcon />
      </Link>
    </nav>
  );
}
