"use client";
import "@/styles/globals.css";
import { YouTubeEmbed } from "@next/third-parties/google";
import { useState } from "react";
import BlurImage from "./blur-image";
export default function VideoCard({
  code,
  thumbnail,
}: {
  code: string;
  thumbnail: string;
}) {
  const [play, setPlay] = useState(true);
  return (
    <>
      {play ? (
        <div className="h-full w-full ">
          <YouTubeEmbed
            videoid={code}
            params="version=3&autoplay=0&controls=0&showinfo=0&disablekb=0&rel=0"
          />
        </div>
      ) : (
        <button
          className="h-full w-full rounded-lg"
          onClick={() => setPlay(true)}
        >
          <BlurImage
            alt={thumbnail ?? "Vídeo Destacado"}
            src={thumbnail}
            height={415}
            width={760}
            className="h-full w-full rounded-lg object-fill"
          />
        </button>
      )}
    </>
  );
}
