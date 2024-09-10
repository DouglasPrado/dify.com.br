import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { ReviewForm } from "./_components/review-form";

export default async function ProductReviews({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.product.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      reviews: true,
    },
  });
  if (!data) {
    notFound();
  }
  return (
    <div className="flex max-w-screen-xl flex-col p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-title text-3xl font-bold dark:text-white">
          Review de produtos
        </h1>
      </div>
      <ReviewForm product={data} />
    </div>
  );
}
