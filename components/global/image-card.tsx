"use client";

import Image from "next/image";

export default function ImageCard({
  title,
  src,
}: {
  title: string;
  src: string;
}) {
  return (
    <div className="flex h-32 w-32">
      <Image
        src={src}
        alt={`[${title}]`}
        width={1200}
        height={1200}
        className="object-cover "
      />
    </div>
  );
}
