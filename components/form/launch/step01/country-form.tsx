import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion as m } from "framer-motion";
import Image from "next/image";
export default function CountryForm({ step }: any) {
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
        Informe o idioma em que o texto será escrito
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
        Deixe em branco caso queira utilizar o idioma padrão do projeto.
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
        <Select defaultValue="789">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o país" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem
                key={`key-country-${country.code}`}
                value={String(country.value)}
              >
                <div className="flex gap-3">
                  <Image
                    src={`https://flag.vercel.app/m/${country.code}.svg`}
                    className="mr-2.5"
                    alt={String(country.name)}
                    width={24}
                    height={16}
                  />
                  {country.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </m.div>
    </>
  );
}
const countries = [
  { name: "Brasil", value: 789, code: "BR" },
  { name: "Estados Unidos", value: 676, code: "US" },
  { name: "Portugal", value: 564, code: "PT" },
  { name: "Angola", value: 234, code: "AG" },
  { name: "Espanha", value: 191, code: "ES" },
];
