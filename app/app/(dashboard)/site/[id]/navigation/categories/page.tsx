import BackButton from "@/components/global/back-button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { Edit2 } from "lucide-react";
import Link from "next/link";
import CreateCollectionButton from "./_components/create-category-button";
export default async function SiteSalesCollections({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.category.findMany({
    where: {
      siteId: decodeURIComponent(params.id),
    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="grid grid-cols-1 items-center justify-start gap-6 lg:flex lg:flex-row">
          <BackButton>Voltar</BackButton>
          <div className="flex flex-col">
            <h1 className="font-title text-2xl">Categorias</h1>
            <p className="flex">Listagem de categorias de artigos e páginas</p>
          </div>
        </div>
        <CreateCollectionButton />
      </div>
      <section className="grid grid-cols-1 gap-2 lg:grid-cols-1">
        <Table>
          <TableCaption>Lista de categorias</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[360px]">Nome</TableHead>
              <TableHead>URL personalizada</TableHead>
              <TableHead>Ordenação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((category: Category, idx: number) => (
              <TableRow key={category.id} className="text-gray-600">
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category.order}</TableCell>
                <TableCell className="flex items-end justify-end text-right">
                  <Link href={`/category/${category.id}`}>
                    <Edit2 className="text-stone-500" size={14} />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
}
