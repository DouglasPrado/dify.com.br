"use client";

import RelatedCard from "@/app/[domain]/(post)/[slug]/_components/related-card";
import ListProducts from "@/components/embeds/list-products";
import ProductReview from "@/components/embeds/product-review";
import BlogCard from "@/components/global/blog-card";
import MDX from "@/components/global/mdx";
import Shared from "@/components/global/shared";
import Tags from "@/components/global/tags";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Collection } from "@prisma/client";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FooterSection from "../products/footer-section";
import NavSection from "../products/nav-section";

interface BlogPostProps {
  data: any;
  schema: any;
  categories: any;
  collections: any;
  url: string;
}

const CONFIGURATION = {
  sidebar: false,
  breadcrumb: false,
  shared: {
    top: true,
    sidebar: false,
    vertical: true,
    bottom: true,
  },
  tags: false,
};

export default function BlogPost({
  data,
  schema,
  categories,
  url,
  collections,
}: BlogPostProps) {
  const product = data.products.length === 1 ? data.products.pop() : null;
  const products = data.products.length > 1 ? data.products : [];

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto flex flex-col items-center justify-center">
        <NavSection
          name={data.site.name}
          logo={{ logo: data.site.logo, config: data.site.logoConfig }}
          categories={categories}
        />
        {CONFIGURATION.breadcrumb && (
          <section className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-6 px-6 py-6  lg:grid-cols-2 lg:px-6 xl:px-0">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{data.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </section>
        )}
        <section className=" mx-auto grid w-full max-w-7xl flex-col items-start justify-start gap-6 p-6 lg:grid-cols-2 lg:px-6 xl:px-0">
          <div className="flex flex-col gap-3">
            <h1 className="font-title text-4xl font-bold text-stone-800 md:text-6xl dark:text-white">
              {data.title}
            </h1>
            <p className="m-auto text-lg text-stone-600 md:text-lg dark:text-stone-400">
              {data.description}
            </p>
            {CONFIGURATION.tags && <Tags tags={data.tags} />}
            {CONFIGURATION.shared.top && (
              <div className="flex flex-col gap-3">
                <span className="font-cal text-sm text-stone-700">
                  Compartilhe o conteúdo
                </span>
                <Shared title={data.title} url={`${url}/${data.slug}`} />
              </div>
            )}
          </div>
          <div className="relative m-auto hidden w-full overflow-hidden sm:block  md:rounded-2xl">
            <Image
              alt={data.title}
              src={data.image}
              width={0}
              height={0}
              style={{ height: "320px", width: "100%" }}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        </section>
      </div>

      <section className=" mx-auto flex w-full max-w-7xl gap-6 py-6 xl:px-0">
        {CONFIGURATION.shared.vertical && (
          <div className="fixed left-0 top-1/3 z-50 hidden flex-col items-center justify-center gap-4 rounded-md bg-white p-4 shadow-lg 2xl:flex">
            <span className="text-[10px] text-stone-400">Compartilhe</span>
            <Shared
              title={data.title}
              url={`${url}/${data.slug}`}
              orientation="vertical"
            />
          </div>
        )}
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 xl:px-0">
          {product && <ProductReview product={product} />}
          {products.length > 0 && <ListProducts products={products} />}
          <MDX source={data.mdxSource} />
          {CONFIGURATION.shared.bottom && (
            <div className="flex flex-col gap-3">
              <span className="font-cal text-sm text-stone-700">
                Ajude esse conteúdo a chegar em mais pessoas.
              </span>
              <Shared title={data.title} url={`${url}/${data.slug}`} />
            </div>
          )}
        </div>
        {CONFIGURATION.sidebar && (
          <div className="h-full! hidden w-full max-w-[340px] flex-col items-center gap-8 rounded-xl  p-6 md:flex">
            <section className="mx-auto flex w-full flex-col gap-3 lg:px-0">
              <div className="mx-auto w-full max-w-7xl px-6 md:px-0">
                <span className="font-title text-xl font-semibold text-stone-700">
                  Compartilhe esse conteúdo
                </span>
              </div>
              <div className="flex w-full flex-col gap-3 ">
                <Shared title={data.title} url={`${url}/${data.slug}`} />
              </div>
            </section>
            <section className="mx-auto flex w-full flex-col gap-3 xl:px-0">
              <div className="mx-auto w-full max-w-7xl px-6 md:px-0">
                <span className="font-title text-xl font-semibold text-stone-700">
                  Busque outros conteúdos
                </span>
              </div>
              <div className="flex w-full flex-col gap-3">
                <Link
                  href="/search"
                  className="flex h-9 w-full items-center gap-2 rounded-md border bg-white px-4 text-sm text-stone-700 hover:border-stone-400 hover:text-stone-700"
                >
                  <Search size={18} />
                  <span>Pesquisar...</span>
                </Link>
              </div>
            </section>
            {data.relatedPosts?.length > 0 && (
              <section className="mx-auto flex w-full flex-col gap-3 xl:px-0">
                <div className="mx-auto w-full max-w-7xl px-6 md:px-0">
                  <h2 className="font-title text-xl font-semibold text-stone-700">
                    Conteúdos relacionados
                  </h2>
                </div>
                <div className="flex w-full flex-col gap-3">
                  {data.relatedPosts.map(
                    ({ relatedPost }: any, idx: number) => (
                      <div key={`key-related-post-${idx}`}>
                        <RelatedCard key={idx} data={relatedPost} />
                      </div>
                    ),
                  )}
                </div>
              </section>
            )}
            <section className="mx-auto flex w-full flex-col gap-3 xl:px-0">
              <div className="mx-auto w-full max-w-7xl px-6 md:px-0">
                <span className="font-title text-xl font-semibold text-stone-700">
                  Nossas coleções
                </span>
              </div>
              <div className="flex w-full flex-col gap-3">
                {collections.map(
                  (
                    collection: Collection & { _count: { posts: number } },
                    idxCollection: number,
                  ) => (
                    <Link
                      className="hover:-translate-y-1 flex w-full items-center justify-between gap-2 rounded  p-4 text-sm capitalize text-stone-700 transition-all duration-200 hover:bg-stone-100"
                      href={`/`}
                      key={`key-collection-${idxCollection}`}
                    >
                      {collection.name}
                      <span className="rounded-full text-sm text-stone-700">
                        {collection._count.posts}
                      </span>
                    </Link>
                  ),
                )}
              </div>
            </section>
          </div>
        )}
      </section>

      {data.adjacentPosts.length > 0 && (
        <div className="relative mb-20 mt-10 sm:mt-10">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-stone-300 dark:border-stone-700" />
          </div>
          <div className="relative flex justify-center">
            <h2 className="bg-white px-2 text-sm text-stone-500 dark:bg-black dark:text-stone-400">
              Continue lendo
            </h2>
          </div>
        </div>
      )}
      {data.adjacentPosts && (
        <div className="mx-5 mb-20 grid max-w-7xl grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:mx-auto xl:grid-cols-3">
          {data.adjacentPosts.map((data: any, index: number) => (
            <BlogCard
              key={`key-post-adjacent-posts-${data.id}-${index}`}
              data={data}
            />
          ))}
        </div>
      )}
      <FooterSection
        data={{
          colors: {
            backgroundFooter: data.site.colors["backgroundFooter"],
            colorContrastFooter: data.site.colors["colorContrastFooter"],
          },
          site: data.site,
        }}
      />
    </section>
  );
}
