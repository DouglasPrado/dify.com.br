import { Textarea } from "@tremor/react";
import { motion as m } from "framer-motion";
export default function DescriptionForm({ step }: any) {
  return (
    <>
      <m.h3
        className="text-start text-xl font-light text-stone-600 dark:text-white"
        initial={{ opacity: 0, y: "-100%" }}
        animate={{
          opacity: 1,
          y: "0%",
          transition: {
            ease: "easeInOut",
            duration: 1.2,
            delay: 0.3,
          },
        }}
      >
        <span className="text-sm uppercase">Sobre o conteúdo</span>
      </m.h3>
      <m.h1
        className="text-start font-title text-3xl dark:text-white"
        initial={{ opacity: 0, y: "-100%" }}
        animate={{
          opacity: 1,
          y: "0%",
          transition: {
            ease: "easeInOut",
            duration: 1.2,
            delay: 0.3,
          },
        }}
      >
        Crie uma estrutura de texto para a abordagem do conteúdo
      </m.h1>
      <m.h2
        className="text-xl font-light text-gray-600"
        initial={{ opacity: 0, y: "-100%" }}
        animate={{
          opacity: 1,
          y: "0%",
          transition: {
            ease: "easeInOut",
            duration: 1.2,
            delay: 0.6,
          },
        }}
      >
        Exemplifique com tópicos, estruturas exemplificadas, ou textos em que
        quer se basear
      </m.h2>
      <m.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={{
          opacity: 1,
          y: "0%",
          transition: {
            ease: "easeInOut",
            duration: 1.2,
            delay: 0.9,
          },
        }}
        className="flex flex-col gap-6 py-6 md:flex-row"
      >
        <Textarea placeholder="Crie o resumo do texto (opcional)" rows={15} />
      </m.div>
    </>
  );
}
