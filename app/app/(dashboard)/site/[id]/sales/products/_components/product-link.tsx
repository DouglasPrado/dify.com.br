import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@prisma/client";
import BlurImage from "../../../../../../../../components/global/blur-image";
import { Button } from "../../../../../../../../components/ui/button";

export function ProductLink({ products }: { products: any }) {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full"
    >
      <CarouselContent className="w-5/6 md:w-1/4">
        {products.map((product: Product, index: number) => (
          <CarouselItem key={index}>
            <Card className="mb-4 mt-2 rounded-3xl border-0 bg-white shadow-lg dark:bg-black">
              <BlurImage
                src={product.image || ""}
                alt=""
                height={500}
                width={500}
                blurDataURL={product.imageBlurhash || ""}
                className="h-44 rounded-t-3xl object-cover"
              />
              <CardContent className="aspect-square flex flex-col items-start justify-center gap-3 rounded-b-3xl bg-white p-3">
                <div>
                  <h1 className="line-clamp-2 text-sm text-stone-700">
                    {product.title}
                  </h1>
                  <p className="line-clamp-2 text-sm font-light text-stone-700">
                    {product.description}
                  </p>
                </div>
                <Button className="w-full bg-black text-white">Conferir</Button>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:block lg:pl-1" />
      <CarouselNext className="hidden lg:block lg:pl-2" />
    </Carousel>
  );
}
