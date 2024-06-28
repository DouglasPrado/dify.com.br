import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Medias from "./_components/medias";

type Props = {
  params: { id: string };
};

const MediaPage = async ({ params }: Props) => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data: any = await prisma.media.findMany({
    where: {
      siteId: decodeURIComponent(params.id),
    },
    include: {
      site: true,
    },
  });

  if (!data) {
    notFound();
  }

  return <Medias medias={data} />;
};

export default MediaPage;
