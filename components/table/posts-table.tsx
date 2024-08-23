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
import { ExternalLink } from "lucide-react";

export function PostsTable({ data }: { data: Queue[] }) {
  return (
    <Table className="h-full max-h-96">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-full">Titulo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(
          (queue) =>
            queue.type === "post" && (
              <TableRow key={queue.id}>
                <TableCell className="font-medium text-xs">
                  {queue.description}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "rounded-full bg-gray-300 px-4 py-0.5 text-xs",
                      queue.status === "complete" && "bg-emerald-200",
                      queue.status === "waiting" && "bg-yellow-200",
                      queue.status === "processing" && "bg-indigo-200",
                    )}
                  >
                    {queue.status === "complete" && "Publicado"}
                    {queue.status === "waiting" && "Aguardando"}
                    {queue.status === "processing" && "Processando"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <ExternalLink size={16} />
                </TableCell>
              </TableRow>
            ),
        )}
      </TableBody>
    </Table>
  );
}
