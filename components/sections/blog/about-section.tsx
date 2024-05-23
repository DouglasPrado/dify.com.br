"use client";
import type { Site } from "@prisma/client";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import BlurImage from "../../global/blur-image";

interface BlogAboutSectionProps {
  data: Site;
}

export default function BlogAboutSection({ data }: BlogAboutSectionProps) {
  return (
    <div className="relative flex h-full w-full justify-center overflow-y-auto px-6 transition-all hover:shadow-xl ">
      <div className="flex flex-col gap-6 py-6">
        <div className="flex w-24">
          <BlurImage
            src={data.logo!}
            alt={""}
            width={500}
            height={500}
            className="h-full w-full rounded-xl object-cover "
            blurDataURL={data.imageBlurhash!}
          />
        </div>
        <div className="flex w-full grow flex-col gap-2">
          <h1 className="line-clamp-2 font-title text-slate-600">
            {data.name}
          </h1>
          <span className="text-light text-xs text-slate-500">
            {data.description}
          </span>
        </div>
        <div className="flex gap-6 ">
          {data.facebook && (
            <Link
              href={data.facebook}
              target="_blank"
              className="hover:cursor-pointer"
            >
              <Facebook strokeWidth={1.25} />
            </Link>
          )}
          {data.instagram && (
            <Link
              href={data.instagram}
              target="_blank"
              className="hover:cursor-pointer"
            >
              <Instagram strokeWidth={1.25} />
            </Link>
          )}
          {data.youtube && (
            <Link
              href={data.youtube}
              target="_blank"
              className="hover:cursor-pointer"
            >
              <Youtube strokeWidth={1.25} />
            </Link>
          )}
          {data.linkedin && (
            <Link
              href={data.linkedin}
              target="_blank"
              className="hover:cursor-pointer"
            >
              <Linkedin strokeWidth={1.25} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
