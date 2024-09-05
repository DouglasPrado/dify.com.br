import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import CreateItemFeatureButton from "./_components/create-item-feature-button";
import CreateItemFeatureModal from "./_components/create-item-feature-modal";
import CreateReviewButton from "./_components/create-item-review-button";
import CreateItemReviewModal from "./_components/create-item-review-modal";
import FeatureItem from "./_components/feature-item";
import ReviewItem from "./_components/review-item";
import { TemplateForm } from "./_components/template-form";

export default async function ContentTunningPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await prisma.template.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      review: { include: { items: true } },
      feature: { include: { items: true } },
      site: {
        select: {
          id: true,
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

  return (
    <div className="flex flex-col space-y-12 p-6">
      <h1 className="font-cal text-3xl font-bold dark:text-white">
        Edição de template
      </h1>
      <div className="flex flex-col gap-3">
        <div className="flex w-full ">
          <TemplateForm data={data} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col  items-center justify-between gap-3 sm:flex-row">
            <h3 className="text-lg font-semibold text-stone-800">
              Mapeamento de avaliações
            </h3>
            <div className="flex w-full max-w-[120px]">
              <CreateReviewButton>
                <CreateItemReviewModal />
              </CreateReviewButton>
            </div>
          </div>
          <div className="flex w-full max-w-xl flex-col px-4">
            {data.review?.items.map((item: any, idx: number) => (
              <ReviewItem
                key={`key-item-review-${idx}`}
                id={item.id}
                name={item.name}
                value={String(Math.floor(Math.random() * 10) + 1)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <h3 className="text-lg font-semibold text-stone-800">
              Especificações tecnicas
            </h3>
            <div className="flex w-full max-w-[120px]">
              <CreateItemFeatureButton>
                <CreateItemFeatureModal />
              </CreateItemFeatureButton>
            </div>
          </div>
          <div className="flex w-full max-w-xl flex-col ">
            {data.feature?.items.map((item: any, idx: number) => (
              <FeatureItem
                key={`key-item-feature-${idx}`}
                name={item.name}
                id={item.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
