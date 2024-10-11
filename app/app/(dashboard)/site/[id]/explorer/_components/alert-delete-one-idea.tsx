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
import { deleteIdea } from "@/lib/actions/ideas";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AlertDeleteOneIdea({ id }: { id: string }) {
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex h-5 w-5 cursor-pointer flex-col items-center justify-center rounded-full bg-stone-200/80 p-1 hover:bg-rose-400 hover:text-white">
          <Trash2 size={18} />
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
              await deleteIdea(id);
              toast.success("Ideias deletada com sucesso!");
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
