"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { deleteMedia } from "@/lib/actions/medias";
import { Media } from "@prisma/client";
import { Copy, MoreHorizontal, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = { file: Media };

const MediaCard = ({ file }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <AlertDialog>
      <DropdownMenu>
        <article className="w-full rounded-lg border bg-stone-100 text-stone-900">
          <div className="relative h-40 w-full">
            <Image
              src={file.slug}
              alt="preview image"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <p className="h-0 w-0 opacity-0">{file.slug}</p>
          <div className="relative p-4">
            <p className="text-muted-foreground font-semibold text-stone-800">
              {file.createdAt.toDateString()}
            </p>
            <p className="truncate text-stone-700">{file.slug}</p>
            <div className="absolute right-4 top-4 cursor-pointer p-[1px] ">
              <DropdownMenuTrigger>
                <MoreHorizontal />
              </DropdownMenuTrigger>
            </div>
          </div>

          <DropdownMenuContent>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-2"
              onClick={() => {
                navigator.clipboard.writeText(file.slug);
                toast({ title: "Copied To Clipboard" });
              }}
            >
              <Copy size={15} /> Copy Image Link
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="flex gap-2">
                <Trash size={15} /> Delete File
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </article>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Você tem certeza que deseja deletar?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Tem certeza de que deseja excluir este arquivo? Você não terá mais
            acesso essa imagem permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            color="red"
            onClick={async () => {
              setLoading(true);
              await deleteMedia(file.id);
              toast({
                title: "Deleted File",
                description: "Successfully deleted the file",
              });
              setLoading(false);
              router.refresh();
            }}
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MediaCard;
