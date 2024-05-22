"use client";
import { Media } from "@prisma/client";
import Image from "next/image";
import CopyButton from "./copy-button";

export default function GridMasonry({ medias }: { medias: Media[] }) {
  const blocks = [];
  for (let i = 0; i < medias.length; i += 4) {
    const thisBlock = medias.slice(i, i + 4);
    const mountedBlock = thisBlock.map((media: Media, idxImage: number) => (
      <button
        className="relative flex h-full w-full items-center justify-center hover:text-emerald-500"
        key={`key-media-${media.id}-${idxImage}`}
      >
        <Image
          className="h-full w-full rounded-lg bg-black object-contain"
          src={media.slug}
          alt=""
          width={400}
          height={400}
        />
        <div className="absolute rounded-xl bg-white p-3 shadow-2xl ">
          <CopyButton
            string={media.slug}
            className="text-nowrap bg-white p-0 text-xs"
          />
        </div>
      </button>
    ));

    blocks.push(
      <div key={`grid-image-${i}`} className="grid gap-4">
        {mountedBlock}
      </div>,
    );
  }

  return blocks;
}
