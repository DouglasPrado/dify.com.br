import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LockKeyhole } from "lucide-react";
import Image from "next/image";
import { Button } from "../../../../../../../components/ui/button";

export function ContentLink({
  contentPrivate = false,
}: {
  contentPrivate?: boolean;
}) {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full"
    >
      <CarouselContent className="w-11/12 md:w-1/4">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={`key-carousel-${index}`}>
            <Card className="border-0 bg-transparent">
              {contentPrivate && (
                <div className="absolute m-6 flex items-center gap-2 rounded-full border border-stone-100 bg-white p-2 shadow-xl shadow-gray-500">
                  <LockKeyhole size={16} />
                  <span className="font-title text-xs">Privado</span>
                </div>
              )}
              <Image
                src="https://userfiles.sdwc.me/6373ffc464e4984fca687.png"
                alt=""
                height={500}
                width={500}
                className="rounded-t-3xl"
              />
              <CardContent className="aspect-square flex flex-col items-start justify-center gap-3 rounded-b-3xl bg-black p-6">
                <div>
                  <h1 className="text-white">Maragogi Hostel</h1>
                  <p className="font-light text-gray-100">Maragogi Hostel</p>
                </div>
                <Button className="w-full bg-white text-black">
                  Saiba mais
                </Button>
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
