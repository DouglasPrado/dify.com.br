import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSession } from "@/lib/auth";
import { Book, Lightbulb, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import ExplorerCard from "./explorer-card";

export default async function Explorer({ data }: { data: any }) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <h1 className="font-cal text-xl text-gray-800">Ideias de conteúdo</h1>
          <div className="relative flex w-full gap-2 rounded-lg border p-2 sm:w-fit">
            <span className="absolute -top-3 bg-white px-1 text-xs font-light text-stone-700">
              Ações
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"outline"} className="flex items-center">
                  <Lightbulb size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-light">Solicitar novas ideias</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"outline"} className="flex items-center">
                  <Book size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-light">Atribuir conhecimento</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"outline"} className="flex items-center">
                  <Trash2 size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-light">Limpar ideias</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {data.map((idea: any, idx: number) => (
            <ExplorerCard key={`key-idea-${idx}`} data={idea} />
          ))}
        </div>
      </div>
      {/* <div className="flex flex-col">
        <h1 className="font-cal text-xl text-gray-800">Ideias de conteúdo</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <ExplorerCard
            data={{
              title:
                "Retro Console R36S: O Melhor Videogame Portátil até R$200!",
              description:
                "Descubra o Retro Console R36S: o melhor videogame portátil abaixo de R$200! Mais de 15.000 jogos, design confortável e fácil de transportar. Perfeito para nostalgia!",
            }}
          />
          <ExplorerCard
            data={{
              title:
                "AYN ODIN 2: Console Portátil Incrível Chega ao Indiegogo!",
              description:
                "Descubra o AYN ODIN 2, o console portátil que chegou por R$2203,54! Com Snapdragon 8 Gen 2, design inovador e uma comunidade engajada. Junte-se à revolução gamer!",
            }}
          />
          <ExplorerCard
            data={{
              title:
                "Unboxing e Impressões: ROG Ally X, o Portátil dos Gamers!",
              description:
                "Conheça o ROG Ally X! Unboxing, design aprimorado, maior autonomia e novas portas USB Tipo C. Uma escolha irresistível para gamers. Fique ligado para mais novidades!",
            }}
          />
          <ExplorerCard
            data={{
              title:
                "Unboxing e Impressões: ROG Ally X, o Portátil dos Gamers!",
              description:
                "Conheça o ROG Ally X! Unboxing, design aprimorado, maior autonomia e novas portas USB Tipo C. Uma escolha irresistível para gamers. Fique ligado para mais novidades!",
            }}
          />
          <ExplorerCard
            data={{
              title:
                "AYN ODIN 2: Console Portátil Incrível Chega ao Indiegogo!",
              description:
                "Descubra o AYN ODIN 2, o console portátil que chegou por R$2203,54! Com Snapdragon 8 Gen 2, design inovador e uma comunidade engajada. Junte-se à revolução gamer!",
            }}
          />
          <ExplorerCard
            data={{
              title:
                "Retro Console R36S: O Melhor Videogame Portátil até R$200!",
              description:
                "Descubra o Retro Console R36S: o melhor videogame portátil abaixo de R$200! Mais de 15.000 jogos, design confortável e fácil de transportar. Perfeito para nostalgia!",
            }}
          />
        </div>
      </div> */}
    </div>
  );
}
