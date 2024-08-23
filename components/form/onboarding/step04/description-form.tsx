import { motion as m } from "framer-motion";
import Form from "../..";
export default function DescriptionForm({ step }: any) {
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
        <span className="ml-3">Configurações</span>
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
        {step} - Qual o nicho de mercado que você pretende atuar?
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
        <Form
          title="Descreva um pouco mais sobre o negócio"
          description="Suas ideias sobre o negócio, suas estratégias, referências."
          helpText="Escreva com suas palavras sobre a ideia do seu negócio."
          inputAttrs={{
            name: "description",
            type: "description",
            defaultValue: "",
          }}
          handleSubmit={() => {}}
        />
      </m.div>
    </>
  );
}
