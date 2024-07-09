import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion as m } from "framer-motion";
export default function TomForm({ step }: any) {
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
        Qual será o tom de voz utilizado no texto?
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
        Deixe em branco caso queira utilizar o tom de voz padrão do projeto.
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
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o tom de voz" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Amigável</SelectItem>
              <SelectItem value="banana">Pessoal</SelectItem>
              <SelectItem value="blueberry">Formal</SelectItem>
              <SelectItem value="grapes">Alegre</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </m.div>
    </>
  );
}
