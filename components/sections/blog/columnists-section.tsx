"use client";
import { cn } from "@/lib/utils";
import type { Columnist } from "@prisma/client";
import BlurImage from "../../global/blur-image";

interface BlogAboutSectionProps {
  data: Columnist[];
}

export default function BlogColumnistsSection({ data }: BlogAboutSectionProps) {
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-y-auto px-6 py-6 transition-all hover:shadow-xl ">
      <h1 className={cn("rounded-full py-2 text-2xl font-bold")}>
        {data.length > 1 ? "Nossa Equipe" : "Sobre mim"}
      </h1>
      <div className="flex flex-col gap-6 py-6">
        {data.map((columnist: Columnist, idxColumnist: number) => (
          <div key={`key-columnist-${idxColumnist}`} className="flex gap-6">
            <div className="flex w-24">
              <BlurImage
                src={columnist.image!}
                alt={""}
                width={500}
                height={500}
                className="h-full w-full rounded-xl object-cover "
                blurDataURL={columnist.imageBlurhash!}
              />
            </div>
            <div className="flex w-full grow flex-col gap-2">
              <h1 className="line-clamp-2 font-title text-stone-600">
                {columnist.name}
              </h1>
              <span
                className={cn(
                  "text-light text-xs text-stone-500",
                  data?.length > 1 ? "line-clamp-2" : "line-clamp-4",
                )}
              >
                {columnist.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
