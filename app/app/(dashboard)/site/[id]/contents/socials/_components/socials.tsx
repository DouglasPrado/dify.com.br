import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";
import SocialCard from "./social-card";

export default async function Socials({
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
  const socials = await prisma.social.findMany({
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

  return socials.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 xl:grid-cols-3">
      {socials.map((social: any) => (
        <SocialCard key={social.id} data={social} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-title text-4xl">Você não tem nenhum conteúdo</h1>
      <Image
        alt="missing post"
        src="https://illustrations.popsy.co/gray/crashed-error.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        Você ainda não tem postagens. Crie um para começar.
      </p>
    </div>
  );
}
