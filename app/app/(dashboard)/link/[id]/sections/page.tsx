import ReorderLink from "@/components/global/reorder-link";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function LinkAnalytics({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.link.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      collections: {
        include: {
          products: true,
          posts: { select: { id: true, image: true, title: true } },
        },
      },
    },
  });

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-start justify-start p-6 sm:justify-start lg:p-10">
        <div className="flex w-full max-w-7xl items-center justify-between space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-title text-xl font-bold sm:text-3xl dark:text-white">
            Construa sessões para o link
          </h1>
          <Link
            href="sections/create"
            className="flex h-8 w-36 items-center justify-center space-x-2 rounded-lg border border-black bg-black text-sm text-white transition-all hover:bg-white hover:text-black focus:outline-none active:bg-stone-100 sm:h-9 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
          >
            Criar sessão
          </Link>
        </div>
        <div className="flex w-full max-w-7xl flex-col gap-6 py-6">
          <ReorderLink data={data.collections} />
        </div>
      </div>
    </>
  );
}
