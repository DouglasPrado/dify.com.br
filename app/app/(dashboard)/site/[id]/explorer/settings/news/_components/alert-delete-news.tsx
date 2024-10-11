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
import { deleteCompetition } from "@/lib/actions/competition";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AlertDeleteNews({ id }: { id: string }) {
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 size={14} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Você tem certeza que deseja deletar?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Tem certeza de que deseja excluir esse link de noticia?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={false}
            color="red"
            onClick={async () => {
              await deleteCompetition(id);
              toast.success("Concorrente deletado com sucesso!");
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
