import { motion as m } from "framer-motion";
export default function NewBusinessForm({ step }: any) {
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
        {step} - Você já tem um negócio próprio ou está começando agora?
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
            delay: 0.5,
          },
        }}
      >
        Estamos curiosos para saber se você já é um empreendedor experiente ou
        está embarcando agora nessa jornada emocionante de construir seu próprio
        negócio.
      </m.h2>
      <m.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={{
          opacity: 1,
          y: "0%",
          transition: {
            ease: "easeInOut",
            duration: 1.2,
            delay: 0.5,
          },
        }}
        className="flex flex-col gap-6 py-6 md:flex-row"
      >
        <button className="rounded-md border bg-black px-6 py-2 text-white hover:border-black hover:bg-white hover:text-black">
          Já tenho negócio
        </button>
        <button className="rounded-md border bg-black px-6 py-2 text-white hover:border-black hover:bg-white hover:text-black">
          Começar do zero
        </button>
      </m.div>
    </>
  );
}
