import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";
import PagesDefaultButton from "./button-pages-default-button";
import PageCard from "./page-card";

export default async function Pages({
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
  const pages = await prisma.page.findMany({
    where: {
      userId: session.user.id as string,
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

  return pages.length > 0 ? (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {pages.map((page: any) => (
          <PageCard key={page.id} data={page} />
        ))}
      </div>
      <p className="pt-8 text-sm text-stone-700">
        Por padrão você deverá ter algumas páginas ( sobre, disclaimer,
        politicas de privacidade, termos de uso.).
      </p>
      <PagesDefaultButton />
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-title text-4xl">Você não tem página ainda.</h1>
      <Image
        alt="missing site"
        src="https://illustrations.popsy.co/gray/falling.svg"
        width={400}
        height={400}
      />
      <p className="pb-8 text-center text-lg text-stone-500">
        Ainda não tem páginas criadas, por padrão você deverá ter algumas
        páginas ( sobre, disclaimer, politicas de privacidade, termos de uso.).
        Abaixo tem um botões pra gerar algumas dessas páginas.
      </p>
      <PagesDefaultButton />
    </div>
  );
}
