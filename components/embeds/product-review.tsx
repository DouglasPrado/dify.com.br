import { cn } from "@/lib/utils";
import { Media, ProductFeature, ProductSources } from "@prisma/client";
import { ChevronsRight } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import AffiliateProductButton from "./affiliate-product-button";
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });
type Data = {
  id: string;
  title: string;
  shortDescription: string;
  priceInCents: string;
  subTitle: string;
  image: string;
  urlAffiliate: string;
  description: string;
  medias: string;
  features: string;
  reviews: string;
  sources: string;
};
export default function ProductReview({
  id,
  title,
  shortDescription,
  priceInCents,
  subTitle,
  image,
  urlAffiliate,
  description,
  medias,
  features,
  reviews,
  sources,
}: Data) {
  return (
    <div className="my-6 flex w-full flex-col gap-3 border border-stone-100 bg-white p-4 px-6 py-6 shadow-lg shadow-gray-100 sm:rounded-lg">
      <div className="flex w-full flex-col items-start gap-3 sm:flex-row">
        <div className="relative flex  h-full w-full flex-col ">
          <Carousel className="flex max-w-[320px] items-center justify-center">
            <CarouselContent className="flex items-center justify-center">
              {JSON.parse(medias)?.map((media: Media, index: number) => (
                <CarouselItem key={`card-images-product-review-${index}`}>
                  <Image
                    alt={media.id || "Sem nome definido"}
                    width={0}
                    height={0}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    src={
                      media.slug ||
                      "data:image/png;base64,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"
                    }
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          <span className="text-xs font-light text-stone-400">
            Fonte: Imagens retirada do Google
          </span>
        </div>
        <div className="flex w-full flex-col gap-4 md:p-4">
          <div className="flex flex-col">
            <span className="font-cal text-[24px]">{title}</span>
            <span className="text-[18px] font-light  text-stone-600">
              {subTitle}
            </span>
          </div>
          <div className="flex w-full flex-col gap-3">
            {sources &&
              JSON.parse(sources).map((source: ProductSources, idx: number) => (
                <AffiliateProductButton
                  key={`key-source-affiliate-${idx}`}
                  price={15000}
                  url={source.url}
                  source={source.source!}
                  size="lg"
                />
              ))}
          </div>
        </div>
      </div>
      {/* <span className="text-sm font-light text-stone-800">
        <ReactMarkdown
          className={`prose-md prose-sm prose-stone m-auto text-[18px] text-stone-800/95 sm:prose-lg dark:prose-invert  prose-h2:font-cal prose-h2:text-[24px] prose-h2:text-stone-950 prose-h3:font-cal prose-h3:text-[20px] prose-h3:text-stone-950 sm:text-[18px] prose-h2:sm:text-[36px]`}
        >
          {description}
        </ReactMarkdown>
      </span> */}
      <div className="flex w-full flex-col gap-6 sm:flex-row">
        <div className="flex w-full flex-col">
          <div className="font-cal text-xl">Especificações técnicas</div>
          {JSON.parse(features).map((feature: ProductFeature, idx: number) => (
            <div key={`key-feature-${idx}`}>
              <div className="flex items-center justify-between py-2">
                <div className="flex gap-2 font-cal text-sm text-stone-700">
                  <ChevronsRight size={16} /> {feature.name}
                </div>
                <div className="text-xs font-light text-stone-700">
                  {feature.value}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col">
          <div className="font-cal text-xl ">Avaliações</div>
          {JSON.parse(reviews).map((review: any, idx: number) => (
            <div key={`key-review-${idx}`}>
              <span className="font-cal text-sm text-stone-800">
                {review.name}
              </span>
              <div className="flex items-center gap-1">
                <div className="relative w-[100%]">
                  <div
                    style={{ width: `${String(Number(review.value) * 10)}%` }}
                    className={cn(`absolute h-2 rounded-full bg-red-500`)}
                  />
                  <div className="h-2 w-[100%] rounded-full bg-stone-200" />
                </div>
                <span className="text-xs font-light text-stone-700">
                  {review.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
