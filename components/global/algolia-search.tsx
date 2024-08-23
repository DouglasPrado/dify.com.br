"use client";
import { SearchBox } from "react-instantsearch";

export default function AlgoliaSearch() {
  return (
    <SearchBox
      placeholder="Pesquise por nome, tags, palavras-chave..."
      classNames={{
        root: "w-full",
        form: "relative",
        input:
          "ring-black border border-stone-200 focus:outline-none focus:ring-0 flex relative justify-between px-12 gap-3 bg-white dark:bg-white items-center rounded-lg py-3 w-full",
        submitIcon:
          "pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-stone-700",
        resetIcon: "absolute right-3 top-5 h-2 w-2 text-stone-100",
      }}
    />
  );
}
