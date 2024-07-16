"use client";
import { Link2 } from "lucide-react";
import ReferenceCard from "../components/reference-card";

export default function ReferenceAction() {
  return (
    <>
      <div className="flex w-full items-center gap-2 ">
        <Link2 width={32} className="text-stone-800" />
        <h1 className="font-title text-xl text-stone-800">Referência</h1>
      </div>
      <p className="text-sm font-light text-stone-500">
        Adicione o link de referência sobre o conteúdo
      </p>
      <div className="my-3 flex h-full  w-full flex-col gap-6 ">
        <ReferenceCard
          data={{
            title: "Site/Blog",
            description: "Crie conteúdo a partir da URL de qualquer site.",
            type: "url",
          }}
        />
        <ReferenceCard
          data={{
            title: "Youtube",
            description: "Crie conteúdo a partir da URL do youtube",
            type: "youtube",
          }}
        />

        <ReferenceCard
          data={{
            title: "Áudio",
            description: "Crie conteúdo a partir de um arquivo de áudio",
            type: "audio",
          }}
        />
        <ReferenceCard
          data={{
            title: "PDF/Word",
            description: "Crie conteúdo a partir de um arquivo de texto",
            type: "pdf",
          }}
        />
        <ReferenceCard
          data={{
            title: "Sitemap",
            description:
              "Capture Sitemap de sites para acompanhamento de conteúdo",
            type: "sitemap",
          }}
        />
        <div className="flex items-center justify-center">
          <p className="text-xs text-stone-300">Fim de curso</p>
        </div>
      </div>
    </>
  );
}
