import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ContentFineTunning } from "@prisma/client";
import { Edit2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Tunnings({
  siteId,
  limit,
}: {
  siteId?: string;
  limit?: number;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  const tunnings = await prisma.contentFineTunning.findMany({
    where: {
      ...(siteId ? { siteId } : {}),
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      site: true,
    },
    ...(limit ? { take: limit } : {}),
  });

  return tunnings.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 py-3">
      <Table>
        <TableCaption>Lista de tunning content</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Tipo</TableHead>
            <TableHead>Publicação automática</TableHead>
            <TableHead>Palavras</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tunnings.map((tunning: ContentFineTunning) => (
            <TableRow key={tunning.id} className="text-gray-600">
              <TableCell className="font-medium">{tunning.interface}</TableCell>
              <TableCell>
                {tunning.published ? (
                  <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs text-white">
                    automático
                  </span>
                ) : (
                  <span className="rounded-full bg-red-500 px-3 py-1 text-xs text-white">
                    desativado
                  </span>
                )}
              </TableCell>
              <TableCell>{tunning.limitWords}</TableCell>
              <TableCell className="flex items-end justify-end text-right">
                <Link href={`/tunning/${tunning.id}`}>
                  <Edit2 className="text-stone-500" size={14} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-title text-4xl">Você não tem nenhum fine Tunning</h1>
      <Image
        alt="missing post"
        src="https://illustrations.popsy.co/gray/crashed-error.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        Você ainda não tem conteúdo. Crie um para começar.
      </p>
    </div>
  );
}
