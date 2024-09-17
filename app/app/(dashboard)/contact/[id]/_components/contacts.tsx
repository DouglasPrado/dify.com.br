import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";
import ContactCard from "./contact-card";

export default async function Contacts({
  whitelistId,
  limit,
}: {
  whitelistId?: string;
  limit?: number;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  const leads = await prisma.lead.findMany({
    where: {
      ...(whitelistId ? { whitelistId } : {}),
    },
    ...(limit ? { take: limit } : {}),
  });

  return leads.length > 0 ? (
    <div className="flex w-full flex-col gap-3">
      {leads.map((lead: any, idxLead: number) => (
        <ContactCard key={`key-contact-card-${idxLead}`} data={lead} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4 py-24">
      <Image
        alt="missing post"
        src="https://illustrations.popsy.co/gray/crashed-error.svg"
        width={400}
        height={400}
      />
      <h1 className="font-title text-3xl">Você não tem nenhum contato</h1>
      <p className="text-lg text-stone-500">
        Você ainda não tem contatos nessa lista. Comece a divulgar seu produto.
      </p>
    </div>
  );
}
