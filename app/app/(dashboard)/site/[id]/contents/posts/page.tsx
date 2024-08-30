import CreatePostButton from "@/app/app/(dashboard)/site/[id]/contents/posts/_components/create-post-button";
import Posts from "@/app/app/(dashboard)/site/[id]/contents/posts/_components/posts";
import BackButton from "@/components/global/back-button";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function SitePosts({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="grid grid-cols-1 items-center justify-start gap-6 lg:flex lg:flex-row">
            <BackButton>Voltar</BackButton>
            <div className="flex flex-col">
              <h1 className="font-title text-2xl">Artigos</h1>
              <p className="flex">Listagem de artigos e conteúdos</p>
            </div>
          </div>
        </div>
        <CreatePostButton />
      </div>

      <Posts siteId={decodeURIComponent(params.id)} />
    </>
  );
}
