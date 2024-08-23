import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Queue } from "@prisma/client";
import { format } from "date-fns";

export function QueuesTable({ data }: { data: Queue[] }) {
  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Agendado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((queue: Queue) => (
          <TableRow key={queue.id}>
            <TableCell className="font-title text-xs">{queue.type}</TableCell>
            <TableCell>
              <span
                className={cn(
                  "rounded-full bg-gray-300 px-4 py-0.5 text-xs",
                  queue.status === "complete" && "bg-emerald-200",
                  queue.status === "waiting" && "bg-yellow-200",
                  queue.status === "processing" && "bg-indigo-200",
                )}
              >
                {queue.status === "complete" && "Completo"}
                {queue.status === "waiting" && "Aguardando"}
                {queue.status === "processing" && "Processando"}
              </span>
            </TableCell>
            <TableCell className="text-right">
              {format(queue.scheduleAt, "dd/MM/yyyy")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
