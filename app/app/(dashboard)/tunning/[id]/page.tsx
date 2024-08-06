import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import WrapperContentTunning from "./_components/wrapper-content-tunning";

export default async function ContentTunningPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await prisma.contentFineTunning.findUnique({
    where: {
      id: decodeURIComponent(params.id),
      
    },
    include: {
      site: {
        select: {
          id: true,
          columnists: true,
        },
      },
    },
  });
  if (!data) {
    notFound();
  }

  if (!session.user.id) {
    notFound();
  }

  return <WrapperContentTunning data={data} />;
}
