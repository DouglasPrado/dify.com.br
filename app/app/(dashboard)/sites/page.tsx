import CreateSiteButton from "@/app/app/(dashboard)/site/[id]/_components/create-site-button";
import Sites from "@/app/app/(dashboard)/site/[id]/_components/sites";
import PlaceholderCard from "@/components/global/placeholder-card";
import CreateSiteModal from "@/components/modal/create-site";
import { Suspense } from "react";

export default function AllSites({ params }: { params: { id: string } }) {
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-title text-3xl font-bold dark:text-white">
            Meus projetos
          </h1>
          <CreateSiteButton>
            <CreateSiteModal />
          </CreateSiteButton>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          {/* @ts-expect-error Server Component */}
          <Sites siteId={decodeURIComponent(params.id)} />
        </Suspense>
      </div>
    </div>
  );
}
