import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSession } from "@/lib/auth";
import { format } from "date-fns";
import { Bolt, Book, Crown, Lightbulb } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import AlertDeleteIdeas from "./alert-delete-ideas";
import ExplorerCard from "./explorer-card";
import ReloadIdeas from "./reload-ideas";

export default async function Explorer({ data }: { data: any }) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-12">
      {data.length > 0 ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex flex-col gap-1">
              <h1 className="font-cal text-xl text-gray-800">
                Ideias de conteúdo
              </h1>
              <span className="text-xs font-light text-stone-700">
                Últimas atualizações: {format(new Date(), "dd/MM/yyyy - HH:mm")}
              </span>
              <span className="text-xs font-light text-stone-700">
                Novas ideias: {data.length}
              </span>
            </div>

            <div className="relative flex w-full gap-2 rounded-lg border p-2 sm:w-fit">
              <span className="absolute -top-3 right-2 bg-white px-1 text-xs font-light text-stone-700">
                Ações para ideias
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ReloadIdeas>
                    <Lightbulb size={18} />
                  </ReloadIdeas>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs font-light">Solicitar novas ideias</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="flex items-center">
                    <Book size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs font-light">Atribuir conhecimento</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDeleteIdeas />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs font-light">Limpar ideias</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="flex items-center">
                    <Bolt size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs font-light">Configurações</p>
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
      ) : (
        <div className="mt-6 flex flex-col items-center space-x-4">
          <h1 className="font-cal text-4xl dark:text-white">
            Ainda não foi elaborado novas ideias.
          </h1>
          <p className="text-lg text-stone-500 dark:text-stone-400">
            Aguarde alguns dias para começar a receber ideias de novos
            conteúdos.
          </p>
          <Image
            alt="missing site"
            src="https://illustrations.popsy.co/gray/success.svg"
            width={400}
            height={400}
            className="dark:hidden"
          />
          <ReloadIdeas>
            <div className="flex gap-3 items-center">
              <Crown size={22} />
              Gerar novas ideias
            </div>
          </ReloadIdeas>
        </div>
      )}
    </div>
  );
}
