import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion as m } from "framer-motion";
export default function MarketingForm({ step }: any) {
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
        <span className="ml-3">Divulgação</span>
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
        {step} - Como pretende divulgar seu negócio na internet?
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
        Em que área você quer trabalhar? Por exemplo, com brinquedos, roupas,
        comida ou algo diferente?
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
            <SelectValue placeholder="Selecione o trafego" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Trafego Organico</SelectItem>
              <SelectItem value="banana">Trafego Privado</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </m.div>
    </>
  );
}
