import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function LaunchCalendarPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.launch.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      site: {
        select: {
          subdomain: true,
        },
      },
    },
  });
  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col space-y-6 px-8 py-6">
      <div className="w-full">
        <h2 className="font-title text-xl">
          Informe o periodo de campanha ativa
        </h2>
        <p className="font-light text-gray-800">
          Crie um nome para sua campanha para distribuir os conteúdos
        </p>
      </div>
    </div>
  );
}
