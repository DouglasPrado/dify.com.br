import { cn } from "@/lib/utils";
import { status_queue } from "@prisma/client";
export default async function PlanningStatus({
  status,
}: {
  status: status_queue;
}) {
  const STATUS: any = {
    waiting: {
      label: "Aguardando",
      color: "bg-orange-400",
    },
    processing: {
      label: "Processando",
      color: "bg-indigo-400",
    },
    cancel: {
      label: "Cancelado",
      color: "bg-rose-400",
    },
    complete: {
      label: "Completo",
      color: "bg-emerald-400",
    },
    failed: {
      label: "Falhou",
      color: "bg-red-400",
    },
  };

  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full px-4 py-1 text-xs text-white md:w-32",
        STATUS[status].color,
      )}
    >
      {STATUS[status].label}
    </span>
  );
}
