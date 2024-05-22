import { cn } from "@/lib/utils";
import { motion as m } from "framer-motion";
import Image from "next/image";

export default function StepsForm({ step, stage }: any) {
  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.25,
      },
    },
  };
  const item = {
    hidden: {
      opacity: 0,
      x: "-100%",
    },
    show: {
      opacity: 1,
      x: "0%",
    },
  };
  return (
    <div className="relative h-screen w-full rounded-r-2xl bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 backdrop-blur md:w-1/4">
      <div className="absolute h-full w-full rounded-r-2xl bg-[url('https://img.freepik.com/free-vector/abstract-design-background-with-blue-purple-gradient_1048-13167.jpg')] bg-cover bg-no-repeat opacity-5" />
      <m.div
        className="flex h-full flex-col gap-8 p-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <m.div variants={item} className="md:pb-6">
          <Image
            width={60}
            height={24}
            alt="[Logo DIFY]"
            className="text-black dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
            src={"/logo-black.svg"}
          />
          <p className="mt-3 font-cal text-lg">
            Desenvolva seu negócio rápidamente do zero, afiliado, dropshipping,
            ads, entre outras estratégias aplicadas.
          </p>
        </m.div>
        <m.div className="flex gap-3" variants={item}>
          <div
            className={cn(
              `flex h-10 w-10 items-center justify-center rounded-full`,
              step >= 0
                ? "bg-black text-white"
                : "border border-black bg-transparent font-cal text-stone-700",
            )}
          >
            1
          </div>
          <div className="flex flex-col">
            <small>ETAPA 1</small>
            <strong>Criação do negócio</strong>
          </div>
        </m.div>
        <m.div className="flex gap-3" variants={item}>
          <div
            className={cn(
              `flex h-10 w-10 items-center justify-center rounded-full`,
              step >= 6
                ? "bg-black text-white"
                : "border border-black bg-transparent font-cal text-stone-700",
            )}
          >
            2
          </div>
          <div className="flex flex-col">
            <small>ETAPA 2</small>
            <strong>Personalização</strong>
          </div>
        </m.div>
        <m.div className="flex gap-3" variants={item}>
          <div
            className={cn(
              `flex h-10 w-10 items-center justify-center rounded-full`,
              step >= 10
                ? "bg-black text-white"
                : "border border-black bg-transparent font-cal text-stone-700",
            )}
          >
            3
          </div>
          <div className="flex flex-col">
            <small>ETAPA 3</small>
            <strong>Divulgação</strong>
          </div>
        </m.div>
        <m.div className="flex gap-3" variants={item}>
          <div
            className={cn(
              `flex h-10 w-10 items-center justify-center rounded-full`,
              step >= 12
                ? "bg-black text-white"
                : "border border-black bg-transparent font-cal text-stone-700",
            )}
          >
            4
          </div>
          <div className=" flex flex-col">
            <small>ETAPA 4</small>
            <strong>Configurações</strong>
          </div>
        </m.div>
        <m.div className="bottom-0 mb-6 gap-1 md:absolute" variants={item}>
          <span className="text-xs">todos os direitos reservados a dify.</span>
          <Image
            width={19}
            height={16}
            alt="[Logo DIFY]"
            className="text-black dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
            src={"/heart.svg"}
          />
          <span className="text-xs">
            feito com carinho pela <strong>dify</strong>
          </span>
        </m.div>
      </m.div>
    </div>
  );
}
