import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";
import ColumnistCard from "./columnist-card";

export default async function Columnists({
  siteId,
  limit,
}: {
  siteId: string;
  limit?: number;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  const columnists = await prisma.columnist.findMany({
    where: {
      ...(siteId ? { siteId } : {}),
    },
    ...(limit ? { take: limit } : {}),
  });

  return columnists.length > 0 ? (
    <div className="flex w-full flex-col gap-3">
      {columnists.map((columnist, idxLead: number) => (
        <ColumnistCard key={`key-contact-card-${idxLead}`} data={columnist} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4 py-24">
      <h1 className="font-title text-3xl">
        Você não tem nenhum colunista cadastrado.
      </h1>
      <Image alt="missing post" src="/content.svg" width={400} height={400} />
      <p className="text-lg text-stone-500">
        Você ainda não tem colunista nessa lista. Comece a divulgar seu produto.
      </p>
    </div>
  );
}
