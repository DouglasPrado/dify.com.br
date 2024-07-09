import { updatePostMetadata } from "@/lib/actions";
import { motion as m } from "framer-motion";
import Form from "../..";
export default function LogoForm({ step }: any) {
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
        {step} - Você já possui logomarca?
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
        Compartilhe conosco se já possui uma identidade visual definida ou se
        precisa de ajuda para desenvolver sua logomarca.
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
          title="Faça upload da sua logo"
          description="A imagem de destaque da sua página. Formatos aceitos: .png, .jpg, .jpeg"
          helpText="Tamanho máximo do arquivo 50 MB. Tamanho recomendado 1200x630."
          inputAttrs={{
            name: "image",
            type: "file",
            defaultValue: "",
          }}
          handleSubmit={updatePostMetadata}
        />
      </m.div>
    </>
  );
}
