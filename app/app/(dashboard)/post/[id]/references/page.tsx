import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Reference } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import ReferenceCard from "./_components/reference-card";

export default async function PostSettings({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.post.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: { references: true },
  });
  if (!data || data.userId !== session.user.id) {
    notFound();
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-title text-3xl font-bold dark:text-white">
          Referências do conteúdo
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {data.references.map((reference: Reference, idx: number) => (
          <ReferenceCard key={`key-reference-${idx}`} data={reference} />
        ))}
      </div>
    </div>
  );
}
