import BlurImage from "@/components/global/blur-image";
import Tags from "@/components/global/tags";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn, placeholderBlurhash } from "@/lib/utils";
import { Media, Post, Product, Site, Tag } from "@prisma/client";
import {
  BookOpen,
  Combine,
  LayoutList,
  ScanBarcode,
  Scroll,
} from "lucide-react";
import Link from "next/link";
import DeletePostButton from "./delete-post-button";
import ResendPostAIButton from "./resend-post-ai-button";

export default function PostCard({
  data,
}: {
  data: Post & {
    site: Site | null;
    tags: Tag[];
    products: Product[];
    medias: Media[];
  };
}) {
  const pImage = data.image === IMAGE_DEFAULT ? 0 : 1;
  const pShortDescription = !data.description ? 0 : 1;
  const pContent = !data.content ? 0 : 1;
  const pPublished = !data.published ? 0 : 1;
  const pTitle = !data.title ? 0 : 1;
  //@ts-ignore
  const pProducts = data?.products?.length > 0 ? 1 : 0;
  const pMedias = data?.medias?.length > 0 ? 1 : 0;

  // Quantidade de itens avaliados
  const totalItems = 7;

  // Pontuação máxima por item
  const itemWeight = 100 / totalItems;

  // Cálculo da pontuação
  const pontuation =
    pImage * itemWeight +
    pShortDescription * itemWeight +
    pContent * itemWeight +
    pPublished * itemWeight +
    pTitle * itemWeight +
    pMedias * itemWeight +
    pProducts * itemWeight;

  const url = `${data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/post/${data.slug}`;
  return (
    <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <div className="flex flex-col overflow-hidden rounded-lg">
        <AspectRatio ratio={16 / 9}>
          <div className="relative h-44 overflow-hidden">
            <BlurImage
              alt={data.title ?? "Card thumbnail"}
              width={0}
              height={0}
              className="aspect-[16/9] w-full object-contain"
              style={{
                width: "500px",
                height: "auto",
              }}
              src={data.image ?? "/placeholder.png"}
              placeholder="blur"
              blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
            />

            <div className="absolute right-2 top-2 flex w-full justify-between gap-2 pl-4">
              <div
                className={cn(
                  pontuation < 10
                    ? "border-4 border-red-500 bg-red-100 text-red-500"
                    : pontuation >= 10 && pontuation <= 80
                    ? "border-4 border-indigo-500 bg-indigo-100 text-indigo-500"
                    : pontuation > 80
                    ? "border-4 border-emerald-500 bg-emerald-100 text-emerald-500"
                    : "",
                  "flex h-8 w-8 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-stone-900 shadow",
                )}
              >
                {Math.round(pontuation)}
              </div>
              <div className="flex gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
                  <ResendPostAIButton
                    postId={data.id}
                    template={data.template}
                  />
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
                  <DeletePostButton postId={data.id} />
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 right-2 flex gap-2">
              {!data.content && (
                <div className="flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-sm font-medium text-stone-800 shadow-md">
                  <Scroll className="h-4 w-4" />
                </div>
              )}
              {!data.published && (
                <span className="rounded-md bg-white px-3 py-0.5 text-sm font-medium text-stone-800 shadow-md">
                  Rascunho
                </span>
              )}

              <span className=" rounded-md bg-white px-3 py-0.5 text-sm font-medium text-stone-800 shadow-md">
                {data.template === "empty" ? (
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    Conteúdo
                  </div>
                ) : data.template === "list" ? (
                  <div className="flex items-center gap-1">
                    <LayoutList className="h-4 w-4" />
                    Lista
                  </div>
                ) : data.template === "compare" ? (
                  <div className="flex items-center gap-1">
                    <Combine className="h-4 w-4" />
                    Comparação
                  </div>
                ) : data.template === "product" ? (
                  <div className="flex items-center gap-1">
                    <ScanBarcode className="h-4 w-4" />
                    Review
                  </div>
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>
        </AspectRatio>

        <Link
          href={`/post/${data.id}`}
          className="border-t border-stone-200 p-4 dark:border-stone-700"
        >
          <h3 className="my-0 line-clamp-2 font-title text-sm font-bold tracking-wide dark:text-white">
            {data.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.description}
          </p>
        </Link>
      </div>

      <div className="absolute bottom-4 flex w-full px-4">
        <Tags tags={data.tags} />
      </div>
    </div>
  );
}

const IMAGE_DEFAULT =
  "data:image/png;base64,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";
