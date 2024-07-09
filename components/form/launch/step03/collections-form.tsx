import { Input } from "@/components/ui/input";
import { motion as m } from "framer-motion";
export default function CollectionsForm({ step }: any) {
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
        <span className="text-sm uppercase">Configurações</span>
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
        Você quer adicionar um título para o conteúdo?
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
        Caso você deseja gerar um título automaticamente por favor pule essa
        etapa.
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
        className="flex flex-col gap-6 py-3 md:flex-row"
      >
        <Input placeholder="Digite o título (opcional)" />
      </m.div>
    </>
  );
}
