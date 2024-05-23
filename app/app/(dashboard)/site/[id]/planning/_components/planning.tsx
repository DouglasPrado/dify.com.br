import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Queue } from "@prisma/client";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Newspaper, ScanBarcode, Smile } from "lucide-react";
import { redirect } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../../components/ui/select";
import PlanningCard from "./planning-card";
export default async function Planning({
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
  const date = new Date();
  const queues = await prisma.queue.findMany({
    where: {
      scheduleAt: {
        gte: new Date(`${date.getMonth()}-01-${date.getFullYear()}`),
      },
      NOT: {
        OR: [
          {
            type: "page_partial",
          },
          {
            type: "post_partial",
          },
          {
            type: "post_keywords",
          },
          {
            type: "post_outline",
          },
          {
            type: "post_merge",
          },
          {
            type: "product_partial",
          },
          {
            type: "social_partial",
          },
          {
            type: "image",
          },
          {
            type: "image_generate",
          },
        ],
      },
      ...(siteId ? { siteId } : {}),
    },
    orderBy: [
      {
        scheduleAt: "asc",
      },
      {
        createdAt: "asc",
      },
    ],
    include: {
      site: true,
    },
    ...(limit ? { take: limit } : {}),
  });
  return (
    <div className="flex flex-col gap-6 pt-6">
      <section className="flex justify-start gap-6">
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Selecione o conteúdo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">
              <span className="flex gap-3">
                <Newspaper size={18} /> Artigos
              </span>
            </SelectItem>
            <SelectItem value="1">
              <span className="flex gap-3">
                <Smile size={18} /> Redes sociais
              </span>
            </SelectItem>
            <SelectItem value="2">
              <span className="flex gap-3">
                <ScanBarcode size={18} /> Produtos
              </span>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue={`${date.getMonth()}`}>
          <SelectTrigger className="w-[280px]">
            <SelectValue
              placeholder={format(date, "LLLL '-' yyyy", { locale: ptBR })}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Janeiro {date.getFullYear()}</SelectItem>
            <SelectItem value="1">Fevereiro {date.getFullYear()}</SelectItem>
            <SelectItem value="2">Março {date.getFullYear()}</SelectItem>
            <SelectItem value="3">Abril {date.getFullYear()}</SelectItem>
            <SelectItem value="4">Maio {date.getFullYear()}</SelectItem>
            <SelectItem value="5">Junho {date.getFullYear()}</SelectItem>
            <SelectItem value="6">Julho {date.getFullYear()}</SelectItem>
            <SelectItem value="7">Agosto {date.getFullYear()}</SelectItem>
            <SelectItem value="8">Setembro {date.getFullYear()}</SelectItem>
            <SelectItem value="9">Outubro {date.getFullYear()}</SelectItem>
            <SelectItem value="10">Novembro {date.getFullYear()}</SelectItem>
            <SelectItem value="11">Dezembro {date.getFullYear()}</SelectItem>
          </SelectContent>
        </Select>
      </section>
      <div className="flex flex-col gap-4">
        {queues.map((queue: Queue, idxQueue: number) => (
          <PlanningCard key={`key-planning-queue-${idxQueue}`} data={queue} />
        ))}
      </div>
    </div>
  );
}
