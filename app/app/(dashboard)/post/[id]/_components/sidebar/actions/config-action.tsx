"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Bolt,
  Facebook,
  Instagram,
  Sparkles,
  Target,
  Twitter,
} from "lucide-react";

export default function ConfigAction() {
  return (
    <>
      <div className="flex w-full items-center gap-2 ">
        <Bolt width={32} className="text-stone-800" />
        <h1 className="font-title text-xl text-stone-800">Configurações</h1>
      </div>
      <p className="text-sm font-light text-stone-500">
        Refine a sua publicação para publicar e destacar seu conteúdo.
      </p>
      <div className="my-6 flex h-full  w-full flex-col gap-6 ">
        <div className="flex items-center gap-3 text-sm font-light text-stone-600">
          <Input placeholder="URL Personalizada" />
          <button onClick={() => {}}>
            <Sparkles className="text-stone-300" />
          </button>
        </div>
        <div className="flex items-center gap-3 text-sm font-light text-stone-600">
          <Switch title="Destacar publicação" />
          <span>Destacar publicação</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-light text-stone-600">
          <Switch title="Destacar publicação" />
          <span>Publicação automática</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-light text-stone-600">
          <Switch title="Destacar publicação" />
          <span>Notificação em massa</span>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="google">
            <AccordionTrigger>
              <div className="flex items-center gap-1 text-sm font-light text-stone-700">
                <Target size={16} />
                Google
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="facebook">
            <AccordionTrigger>
              <div className="flex items-center gap-1 text-sm font-light text-stone-700">
                <Facebook size={16} />
                Facebook
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="instagram">
            <AccordionTrigger>
              <div className="flex items-center gap-1 text-sm font-light text-stone-700">
                <Instagram size={16} />
                Instagram
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="twitter">
            <AccordionTrigger>
              <div className="flex items-center gap-1 text-sm font-light text-stone-700">
                <Twitter size={16} />
                Twitter
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex items-center justify-center">
          <p className="text-xs text-stone-300">Fim de curso</p>
        </div>
      </div>
    </>
  );
}
