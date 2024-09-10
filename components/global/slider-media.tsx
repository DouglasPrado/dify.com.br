"use client";
import { placeholderBlurhash } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BlurImage from "./blur-image";
export default function SliderMedia({
  data,
  errorMessage = "Não existe itens nesse slide.",
}: any) {
  const indicatorWidthPercent =
    data.medias.length > 0 ? 100 / data.medias.length : 100;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const sliderRef = useRef(null);
  useEffect(() => {
    const sliderCurrent: any = sliderRef.current;

    if (!sliderCurrent) {
      return;
    }

    // Find all the slides inside of the slider
    const slides: any = sliderCurrent.querySelectorAll(".item-slide");
    const slidesArray = Array.from(slides);
    // Wait until a slide is 50% visible, then find it's index in the array of
    // all slides and update the currentSlideIndex
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slidesArray.indexOf(entry.target);
            setCurrentSlideIndex(index);
          }
        });
      },
      {
        root: sliderCurrent,
        threshold: 0.5,
      },
    );
    slides.forEach((slide: any) => observer.observe(slide));

    return () => slides.forEach((slide: any) => observer.unobserve(slide));
  }, []);
  return (
    <div
      className="carousel-container max-w-full lg:hidden"
      style={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        className="flex w-full touch-pan-x touch-pan-y snap-x snap-mandatory flex-row gap-3 overflow-y-hidden overflow-x-scroll"
        style={{
          paddingBottom: "15px",
          clipPath: "inset(0 0 15px 0)",
        }}
        ref={sliderRef}
      >
        <div className="item-slide flex w-full flex-shrink-0 snap-start flex-col items-center lg:w-1/4 ">
          <BlurImage
            alt={`[${data.title}]`}
            width={1200}
            height={630}
            // className="h-full w-full animate-[bounce-slow_2s_ease-in-out_infinite] object-contain"
            className="h-full w-full object-contain"
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
            src={data.image ?? "/placeholder.png"}
          />
          <div className=" mb-6 h-4 w-64 rounded-[50%] bg-black bg-opacity-30 blur-md"></div>
        </div>
        {data.medias.length >= 0 ? (
          data.medias.map((item: any, idx: number) => (
            <div
              key={idx}
              className="item-slide w-full flex-shrink-0 snap-start lg:w-1/4"
            >
              <Image
                alt={`[${data.title}]`}
                width={1200}
                height={630}
                className="h-full w-full object-cover"
                src={item.slug}
              />
            </div>
          ))
        ) : (
          <p className="text-stone-500">{errorMessage}</p>
        )}
      </div>
      <div className="relative h-0.5 w-full bg-gray-300">
        <div
          className="absolute left-0 top-0 h-0.5 bg-gray-500"
          style={{
            width: `${indicatorWidthPercent}%`,
            left: `${indicatorWidthPercent * currentSlideIndex}%`,
            transition: "left 150ms ease-in-out",
          }}
        />
      </div>
    </div>
  );
}
