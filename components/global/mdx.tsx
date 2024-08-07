"use client";

import BlurImage from "@/components/global/blur-image";
import { replaceLinks } from "@/lib/remark-plugins";
import dynamic from "next/dynamic";

const YouTubeEmbed = dynamic(() => import("./youtube-embed"), { ssr: false });

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { Tweet } from "react-tweet";
import Anchor from "./anchor";
import TOC from "./toc";

// import styles from "./mdx.module.css";

export default function MDX({
  source,
}: {
  source: MDXRemoteProps & { toc: any };
}) {
  const components = {
    a: replaceLinks,
    BlurImage,
    Tweet,
    YouTubeEmbed,
    Anchor,
    TOC,
  };
  return (
    <article
      className={`prose-md prose-sm prose-stone m-auto sm:prose-lg dark:prose-invert`}
      suppressHydrationWarning={true}
    >
      {/* @ts-ignore */}
      <MDXRemote {...source} components={components} />
    </article>
  );
}
