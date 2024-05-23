import {
  BarChart,
  BetweenHorizontalStart,
  Bolt,
  MoreVertical,
  PauseCircle,
  Trash,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Launch } from "@prisma/client";
import Link from "next/link";
import LaunchStartButton from "../../app/app/(dashboard)/site/[id]/planning/launch/_components/launch-start-button";

export function LaunchMenu({ data }: { data: Launch }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer rounded-md p-3 hover:bg-stone-100">
          <MoreVertical color="gray" size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Gerenciar campanha</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {data.status === "processing" || data.status === "play" ? (
              <>
                <PauseCircle className="mr-2 h-4 w-4" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <LaunchStartButton id={data.id} />
                <span>Iniciar</span>
              </>
            )}
          </DropdownMenuItem>
          <Link href={`/launch/${data.id}/analytics`}>
            <DropdownMenuItem>
              <BarChart className="mr-2 h-4 w-4" />
              <span>Estatísticas</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href={`/launch/${data.id}/analytics`}>
            <DropdownMenuItem>
              <BetweenHorizontalStart className="mr-2 h-4 w-4" />
              <span>Fila de processamento</span>
              <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href={`/launch/${data.id}/details`}>
            <DropdownMenuItem>
              <Bolt className="mr-2 h-4 w-4" />
              <span>Configurações</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Trash color="red" className="mr-2 h-4 w-4" />
          <span className="text-red-500">Deletar</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
