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
import { Template } from "@prisma/client";
import { Edit2 } from "lucide-react";
import Link from "next/link";
import CreateTemplateButton from "./_components/create-template-button";
export default async function SiteSalesTemplates({
  params,
}: {
  params: { id: string };
}) {
  const templates = await prisma.template.findMany({
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
            <h1 className="font-title text-2xl">Template</h1>
            <p className="flex">Listagem de template de produtos</p>
          </div>
        </div>
        <CreateTemplateButton />
      </div>
      <section className="grid grid-cols-1 gap-2 lg:grid-cols-1">
        <Table>
          <TableCaption>Lista de template</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[360px]">Nome</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates?.map((template: Template, idx: number) => (
              <TableRow key={template.id} className="text-gray-600">
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell className="flex items-end justify-end text-right">
                  <Link href={`/template/${template.id}`}>
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
