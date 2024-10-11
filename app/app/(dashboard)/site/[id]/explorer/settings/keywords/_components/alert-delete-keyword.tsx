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
import { deleteKeyword } from "@/lib/actions/keywords";
import { Keyword } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AlertDeleteKeyword({ keyword }: { keyword: Keyword }) {
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div
          key={`key-keyword-${keyword.id}`}
          className="flex cursor-pointer items-center rounded bg-stone-200/40 px-6 py-2 text-stone-600 hover:bg-stone-900 hover:text-stone-50"
        >
          <span className="text-xs font-light ">{keyword.keyword}</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Você tem certeza que deseja deletar?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Tem certeza de que deseja excluir todas as ideias? Você não terá
            mais acesso a essas ideias, terá que gerar novas ideias.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={false}
            color="red"
            onClick={async () => {
              await deleteKeyword(keyword.id);
              toast.success("Palavra chave foi deletada");
              router.refresh();
            }}
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
