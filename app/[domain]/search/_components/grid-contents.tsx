"use client";

import AlgoliaSearch from "@/components/global/algolia-search";
import RefinementListAlgolia from "@/components/global/refinement-list";
import { searchClient } from "@/lib/typesenseAdapter";
import { InfiniteHits, InstantSearch } from "react-instantsearch";
import ContentCard from "./content-card";
export type GridProductsProps = {
  siteId: string;
  openActions: boolean;
};

export default function GridContents({ siteId }: GridProductsProps) {
  return (
    <InstantSearch
      indexName={`${siteId}`}
      searchClient={searchClient}
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <AlgoliaSearch />
      <div className="flex w-full gap-12">
        <div className="flex flex-col rounded-xl lg:w-[320px]">
          {/* <RefinementListAlgolia attribute="type" title="Tipo" /> */}
          <RefinementListAlgolia attribute="collections" title="Categorias" />
          <RefinementListAlgolia attribute="tags" title="Tags" />
        </div>
        <InfiniteHits
          classNames={{
            list: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-0 gap-3 lg:gap-6 last:mb-24 mx-auto max-w-7xl ",
            loadMore:
              "flex w-full font-semibold mt-12 text-gray-700 hover:text-primary-500 items-center justify-center px-3 py-2 rounded-lg text-sm mx-auto my-3",
          }}
          translations={{
            showPreviousButtonText: "Ver anteriores...",
            showMoreButtonText: "",
          }}
          showPrevious={false}
          hitComponent={({ hit, idx }: any) => <ContentCard data={hit} />}
        />
      </div>
    </InstantSearch>
  );
}
