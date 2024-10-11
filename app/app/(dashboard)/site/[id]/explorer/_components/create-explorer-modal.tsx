"use client";

import { ExplorerForm } from "./explorer-form";

export default function CreateExplorerModal({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-white p-6 shadow md:max-w-3xl dark:bg-black dark:md:border-stone-700">
      <div className="">
        <h2 className="text-start font-cal text-xl text-stone-700 dark:text-white">
          Gerar o conteúdo automatizado.
        </h2>
      </div>
      <div className="relative flex flex-col">
        <ExplorerForm id={id} title={title} description={description} />
      </div>
    </div>
  );
}
