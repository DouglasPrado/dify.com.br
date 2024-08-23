import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bean,
  Magnet,
  ScanFace,
  Smile,
  Sprout,
  SquareAsterisk,
} from "lucide-react";
import Image from "next/image";

export function CalendarSocialTable({ data }: { data: any }) {
  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Titulo</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">Objetivo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((task: any) => (
          <TableRow key={task.id}>
            <TableCell className="text-sm">
              <span className="flex items-center gap-6 text-gray-700">
                <Image
                  src={`https://www.google.com/s2/favicons?sz=64&domain_url=${task.channel}.com`}
                  alt={task.channel}
                  width={20}
                  height={20}
                />
                {task.title}
              </span>
            </TableCell>
            <TableCell>
              {task.type === "short" ? (
                <div className="flex gap-1">
                  <div className="h-4 w-1 bg-black" />
                  <div className="h-4 w-1 bg-stone-300" />
                  <div className="h-4 w-1 bg-stone-300" />
                </div>
              ) : task.type === "middle" ? (
                <div className="flex gap-1">
                  <div className="h-4 w-1 bg-black" />
                  <div className="h-4 w-1 bg-black" />
                  <div className="h-4 w-1 bg-stone-300" />
                </div>
              ) : (
                <div className="flex gap-1">
                  <div className="h-4 w-1 bg-black" />
                  <div className="h-4 w-1 bg-black" />
                  <div className="h-4 w-1 bg-black" />
                </div>
              )}
            </TableCell>
            <TableCell className="text-right">
              {task.goal === "traffic" ? (
                <span className="flex justify-end gap-2  text-right text-sm text-gray-700">
                  <Bean size={18} /> Tráfego
                </span>
              ) : task.goal === "engagement" ? (
                <span className="flex justify-end gap-2  text-right text-sm text-gray-700">
                  <Magnet size={18} /> Engajamento
                </span>
              ) : task.goal === "brand" ? (
                <span className="flex justify-end gap-2  text-right text-sm text-gray-700">
                  <SquareAsterisk size={18} /> Marca
                </span>
              ) : task.goal === "nutrition" ? (
                <span className="flex justify-end gap-2  text-right text-sm text-gray-700">
                  <Sprout size={18} /> Nutrição
                </span>
              ) : task.goal === "conversion" ? (
                <span className="flex justify-end gap-2  text-right text-sm text-gray-700">
                  <ScanFace size={18} /> Conversão
                </span>
              ) : task.goal === "lead" ? (
                <span className="flex justify-end gap-2 text-right text-sm text-gray-700">
                  <Smile size={18} /> Lead
                </span>
              ) : (
                task.goal
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
