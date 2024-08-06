"use client";

import BlurImage from "@/components/global/blur-image";
import { replaceLinks } from "@/lib/remark-plugins";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { Tweet } from "react-tweet";
// import styles from "./mdx.module.css";

export default function MDX({ source }: { source: MDXRemoteProps }) {
  const components = {
    a: replaceLinks,
    BlurImage,
    Tweet,
  };

  return (
    <article
      className={`prose-md prose-stone m-auto sm:prose-lg dark:prose-invert`}
      suppressHydrationWarning={true}
    >
      {/* @ts-ignore */}
      <MDXRemote {...source} components={components} />
    </article>
  );
}
