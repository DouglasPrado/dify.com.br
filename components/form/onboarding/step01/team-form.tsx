import { Button } from "@/components/ui/button";
import { motion as m } from "framer-motion";
import { Minus, Plus } from "lucide-react";
export default function TeamForm({ step }: any) {
  return (
    <>
      <m.h3
        className="border-l-4 border-black text-start text-2xl font-light dark:text-white"
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
        <span className="ml-3">Criação do negócio</span>
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
        {step} - Quantas pessoas você planeja ter ajudando no seu novo negócio?
      </m.h1>
      <m.h2
        className="text-xl text-gray-800"
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
        Estamos curiosos para saber mais sobre sua equipe e como podemos
        apoiá-lo nessa jornada empreendedora.
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
        <div className="flex flex-row items-center gap-12">
          <div className="flex flex-row items-center gap-6">
            <Button
              variant="outline"
              size="icon"
              type="button"
              className="h-8 w-8 shrink-0 rounded-full"
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <div className="text-7xl font-bold tracking-tighter">{1}</div>
            <Button
              variant="outline"
              size="icon"
              type="button"
              className="h-8 w-8 shrink-0 rounded-full"
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>
      </m.div>
    </>
  );
}
