import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion as m } from "framer-motion";
export default function TypeForm({ step }: any) {
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
        {step} - Qual o tipo de negócio que você quer iniciar?
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
        Queremos saber se você está pensando em vender produtos digitais, ser
        afiliado, criar conteúdo para ganhar dinheiro, abrir uma loja online,
        oferecer serviços com agendamento ou algo diferente.
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
        className="flex gap-6 py-6 md:flex-row"
      >
        <RadioGroup
          defaultValue="ecommerce"
          className="grid w-full grid-cols-1 gap-6 md:grid-cols-3"
        >
          <div className="flex items-center">
            <Label
              htmlFor="r1"
              className="flex w-full cursor-pointer items-center gap-2 space-x-2 border p-6"
            >
              <RadioGroupItem value="affiliates" id="r1" />
              Afiliados
            </Label>
          </div>
          <div className="flex items-center">
            <Label
              htmlFor="r2"
              className="flex w-full cursor-pointer items-center gap-2 space-x-2 border p-6"
            >
              <RadioGroupItem value="infoproduct" id="r2" />
              Infoproduto
            </Label>
          </div>
          <div className="flex items-center">
            <Label
              htmlFor="r3"
              className="flex w-full cursor-pointer items-center gap-2 space-x-2 border p-6"
            >
              <RadioGroupItem value="content" id="r3" />
              Monetização de conteúdo
            </Label>
          </div>
          <div className="flex items-center">
            <Label
              htmlFor="r4"
              className="flex w-full cursor-pointer items-center gap-2 space-x-2 border p-6"
            >
              <RadioGroupItem value="dropshipping" id="r4" />
              Dropshipping
            </Label>
          </div>
          <div className="flex items-center">
            <Label
              htmlFor="r5"
              className="flex w-full cursor-pointer items-center gap-2 space-x-2 border p-6"
            >
              <RadioGroupItem value="services" id="r5" />
              Serviços
            </Label>
          </div>
          <div className="flex w-full items-center">
            <Label
              htmlFor="r6"
              className="flex w-full cursor-pointer items-center gap-2 space-x-2 border p-6"
            >
              <RadioGroupItem value="ecommerce" id="r6" />
              Loja virtual
            </Label>
          </div>
        </RadioGroup>
      </m.div>
    </>
  );
}
