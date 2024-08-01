"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link2, Sparkles } from "lucide-react";
import MagicCard from "../components/magic-card";
import ReferenceCard from "../components/reference-card";

export default function MagicToolsAction({ siteId }: { siteId: string }) {
  return (
    <>
      <div className="flex w-full items-center gap-2">
        <Sparkles width={32} className="text-stone-800" />
        <h1 className="font-title text-xl text-stone-800">Magic Tools</h1>
      </div>
      <p className="text-sm font-light text-stone-500">
        Potencialize o seu conteúdo para agilizar a produção de conteúdo.
      </p>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="account" className="w-full">
            <Sparkles width={18} className="mr-3" />
            Magic Tools
          </TabsTrigger>
          <TabsTrigger value="password" className="w-full">
            <Link2 width={18} className="mr-3" />
            Referências
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="my-6 flex h-full w-full flex-col gap-6 ">
            <Button size={"lg"}>Aplicar tudo</Button>
            <MagicCard
              data={{
                title: "Gerar título",
                description:
                  "Aplique título otimizado em SEO para melhorar seu conteúdo.",
                type: "title",
              }}
            />
            <MagicCard
              data={{
                title: "Gerar descrição curta",
                description:
                  "Aplique descrição otimizado em SEO para melhorar seu conteúdo.",
                type: "description",
              }}
            />
            <MagicCard
              data={{
                title: "Elabore a o conteúdo",
                description:
                  "Elabore conteúdo a partir das minhas referências.",
                type: "content",
              }}
            />
            {/* <MagicCard
              data={{
                title: "Descrever tópico",
                description:
                  "Descreva os tópicos considerando todos os títulos com H2.",
                type: "content",
              }}
            />
            <MagicCard
              data={{
                title: "Aplicar links internos",
                description:
                  "Crie links internos de acordo com os contextos do texto.",
                type: "internal-link",
              }}
            /> */}
            <div className="flex items-center justify-center">
              <p className="text-xs text-stone-300">Fim de curso</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <p className="text-center text-xs font-light text-stone-300">
            Para habilitar as magics tools você deverá adicionar contexto para
            refinar as ferramentas <strong>magic tools</strong>
          </p>
          <div className="my-6 flex h-full  w-full flex-col gap-6 ">
            <ReferenceCard
              data={{
                title: "Palavra chave",
                description:
                  "Adicione palavra-chave para melhorar o SEO do conteúdo.",
                type: "keywords",
                siteId,
              }}
            />
            <ReferenceCard
              data={{
                title: "Estrutura de tópicos",
                description: "Monte a estrutura do seu conteúdo.",
                type: "outlines",
                siteId,
              }}
            />
            <ReferenceCard
              data={{
                title: "Link",
                description: "Crie conteúdo a partir da URL de qualquer site.",
                type: "url",
                siteId,
              }}
            />
            <ReferenceCard
              data={{
                title: "Texto",
                description: "Crie conteúdo de um bloco de texto.",
                type: "text",
                siteId,
              }}
            />

            <ReferenceCard
              data={{
                title: "Youtube",
                description: "Crie conteúdo a partir da URL do youtube",
                type: "youtube",
                siteId,
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
            {/* 
            <ReferenceCard
              data={{
                title: "Áudio",
                description: "Crie conteúdo a partir de um arquivo de áudio",
                type: "audio",
                siteId,
              }}
            />
            <ReferenceCard
              data={{
                title: "PDF/Word",
                description: "Crie conteúdo a partir de um arquivo de texto",
                type: "pdf",
                siteId,
              }}
            /> */}
            <div className="flex items-center justify-center">
              <p className="text-xs text-stone-300">Fim de curso</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
