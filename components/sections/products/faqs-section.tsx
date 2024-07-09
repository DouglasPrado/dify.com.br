import type { Media, Product, ProductSections, Site } from "@prisma/client";
import Accordion from "../../global/accordion";

interface FAQSSectionSectionProps {
  data: Product & {
    site: Site;
    sections: ProductSections[] & { medias: Media[] };
  };
}

export default function FAQSSection({ data }: FAQSSectionSectionProps) {
  return (
    <section className="flex flex-col gap-6 bg-white px-6 py-12 lg:px-0">
      <h1 className="pb-6 font-title text-3xl">Perguntas frequentes</h1>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 ">
        {data.sections.map(
          (section: any, idx: number) =>
            section.reference === "faq" && (
              <Accordion
                key={`key-accordion-ask-${idx}`}
                title={JSON.parse(section.content).ask}
                description={JSON.parse(section.content).answer}
              />
            ),
        )}
      </div>
    </section>
  );
}
