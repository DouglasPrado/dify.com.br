"use client";
import { useEffect, useRef, useState } from "react";
import ContentCard from "../../app/app/(dashboard)/site/[id]/contents/_components/content-card";

export default function Slider({
  data,
  errorMessage = "Não existe itens nesse slide.",
}: any) {
  const indicatorWidthPercent = data.length > 0 ? 100 / data.length : 100;
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
      className="carousel-container max-w-full"
      style={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        className="flex w-full touch-pan-x snap-x snap-mandatory flex-row gap-3 overflow-x-scroll"
        style={{
          paddingBottom: "15px",
          clipPath: "inset(0 0 15px 0)",
        }}
        ref={sliderRef}
      >
        {data.length >= 0 ? (
          data.map((item: any, idx: number) => (
            <div
              key={idx}
              className="item-slide w-full flex-shrink-0 snap-start lg:w-1/4"
            >
              <ContentCard data={item} key={idx} hit={false} />
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
