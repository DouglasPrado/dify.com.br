import { Archive, CopyPlus, Edit, MoreVertical, Trash } from "lucide-react";

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
import OpenQRCodeButton from "../global/open-qrcode-button";
import GetQRCodeModal from "../modal/get-qrcode";

export function LinkMenu({ data }: { data: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer rounded-md p-3 hover:bg-stone-100">
          <MoreVertical color="gray" size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Gerenciar link</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/link/${data.id}/analytics`}>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>
          </Link>
          <Link href={`/launch/${data.id}/analytics`}>
            <DropdownMenuItem>
              <CopyPlus className="mr-2 h-4 w-4" />
              <span>Duplicar link</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <OpenQRCodeButton>
              <GetQRCodeModal data={data} />
            </OpenQRCodeButton>
          </DropdownMenuItem>

          <Link href={`/launch/${data.id}/details`}>
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              <span>Arquivar</span>
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
