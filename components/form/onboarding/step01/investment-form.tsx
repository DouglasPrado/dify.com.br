import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion as m } from "framer-motion";
export default function InvestmentForm({ step }: any) {
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
        {step} - Quanto você pretende investir no seu novo negócio?
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
        Compartilhe conosco seu plano financeiro para que possamos ajudá-lo a
        alcançar seus objetivos.
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
            <SelectValue placeholder="Selecione o investimento" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">R$ 100,00 a R$ 1.000,00</SelectItem>
              <SelectItem value="banana">R$ 1.001,00 a R$ 5.000,00</SelectItem>
              <SelectItem value="blueberry">
                R$ 5.001,00 a R$ 10.000,00
              </SelectItem>
              <SelectItem value="grapes">
                R$ 10.001,00 a R$ 20.000,00
              </SelectItem>
              <SelectItem value="pineapple">
                R$ 20.001,00 a R$ 50.000,00
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </m.div>
    </>
  );
}
