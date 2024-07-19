"use client";
import { useRefinementList, UseRefinementListProps } from "react-instantsearch";
import { Input } from "../ui/input";

export default function RefinementListAlgolia(
  props: UseRefinementListProps & { title: string },
) {
  const {
    items,
    refine,
    searchForItems,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList(props);

  return (
    <div className="border-b py-6">
      <Input
        type="search"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        maxLength={512}
        placeholder={`Pesquisar ${props.title}`}
        className="relative flex w-full items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white px-3 py-3 ring-black focus:outline-none focus:ring-0 dark:bg-white"
        onChange={(event) => searchForItems(event.currentTarget.value)}
      />
      <ul className="flex flex-col gap-1 py-2">
        <span className="py-3 font-title font-semibold text-stone-700">
          {props.title}
        </span>
        {items.map((item) => (
          <li key={item.label}>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.isRefined}
                onChange={() => refine(item.value)}
                className="text-black focus:border-black focus:outline-none focus:ring-black dark:border-black"
              />
              <span className="text-sm text-stone-900 first-letter:uppercase">
                {item.label}
              </span>
              <span className="rounded-full bg-stone-200 px-2 text-xs text-stone-400">
                {item.count}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
