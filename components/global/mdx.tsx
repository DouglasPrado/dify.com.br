"use client";

import BlurImage from "@/components/global/blur-image";
import { replaceLinks } from "@/lib/remark-plugins";
import dynamic from "next/dynamic";

const YouTubeEmbed = dynamic(() => import("./youtube-embed"), { ssr: false });

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import Image, { ImageProps } from "next/image";
import { Tweet } from "react-tweet";
import Anchor from "../embeds/anchor";
import ListProducts from "../embeds/list-products";
import ProductReview from "../embeds/product-review";
import TOC from "../embeds/toc";
import TopProducts from "../embeds/top-products";
// import styles from "./mdx.module.css";

export default function MDX({
  source,
}: {
  source: MDXRemoteProps & { toc: any };
}) {
  const components = {
    a: replaceLinks,
    // eslint-disable-next-line jsx-a11y/alt-text
    img: (props: ImageProps) => <Image {...props} layout="responsive" />,
    BlurImage,
    Tweet,
    YouTubeEmbed,
    Anchor,
    TOC,
    ProductReview,
    TopProducts,
    ListProducts,
  };
  return (
    <article
      className={`prose-md prose-sm prose-stone m-auto text-[16px] text-stone-800 sm:prose-lg dark:prose-invert`}
      suppressHydrationWarning={true}
    >
      {/* @ts-ignore */}
      <MDXRemote {...source} components={components} />
    </article>
  );
}
