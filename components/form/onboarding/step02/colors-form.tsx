import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion as m } from "framer-motion";
export default function ColorsForm({ step }: any) {
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
        <span className="ml-3">Personalização</span>
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
        {step} - Você já definiu as cores que representarão a identidade visual
        do seu negócio?
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
        Compartilhe conosco se você já escolheu uma paleta de cores ou se
        precisa de ajuda para decidir.
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
        <RadioGroup
          defaultValue="ecommerce"
          className="grid w-full grid-cols-1 gap-6 md:grid-cols-3"
        >
          <div className="flex items-center">
            <Label htmlFor="r1" className="flex w-full cursor-pointer ">
              <RadioGroupItem value="affiliates" id="r1" hidden={true} />
              <div className="grid w-full grid-cols-4 rounded-lg border">
                <div className="h-24 w-full bg-black"></div>
                <div className="h-24 w-full bg-stone-100"></div>
                <div className="h-24 w-full bg-stone-500"></div>
                <div className="h-24 w-full bg-indigo-500"></div>
              </div>
            </Label>
          </div>
          <div className="flex items-center">
            <Label htmlFor="r1" className="flex w-full cursor-pointer ">
              <RadioGroupItem value="affiliates" id="r1" hidden={true} />
              <div className="grid w-full grid-cols-4 rounded-lg border">
                <div className="h-24 w-full bg-white"></div>
                <div className="h-24 w-full bg-violet-100"></div>
                <div className="h-24 w-full bg-pink-500"></div>
                <div className="h-24 w-full bg-red-500"></div>
              </div>
            </Label>
          </div>
          <div className="flex items-center">
            <Label htmlFor="r1" className="flex w-full cursor-pointer ">
              <RadioGroupItem value="affiliates" id="r1" hidden={true} />
              <div className="grid w-full grid-cols-4 rounded-lg border">
                <div className="h-24 w-full bg-white"></div>
                <div className="h-24 w-full bg-black"></div>
                <div className="h-24 w-full bg-emerald-500"></div>
                <div className="h-24 w-full bg-green-500"></div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </m.div>
    </>
  );
}
