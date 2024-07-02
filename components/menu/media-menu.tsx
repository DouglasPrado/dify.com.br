import { CircleEllipsis, Copy, Edit, Trash } from "lucide-react";

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
import Link from "next/link";

export function MediaMenu({ data }: { data?: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer rounded-md  hover:bg-stone-100">
          <CircleEllipsis className="text-stone-500" size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Gerenciar arquivo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`#`}>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              <span>Renomear</span>
            </DropdownMenuItem>
          </Link>
          <Link href={`#`}>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              <span>Copiar URL</span>
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
