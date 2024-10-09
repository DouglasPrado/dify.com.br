import { Keywords } from "@prisma/client";

export default function KeywordsCard({ data }: { data: Keywords[] }) {
  return (
    <div className="flex w-full flex-wrap gap-2 ">
      {data.map((keyword: Keywords, idx: number) => (
        <div
          key={`key-keyword-${keyword.id}-${idx}`}
          className="flex items-center rounded bg-stone-200/40 px-6 py-2"
        >
          <span className="text-xs font-light text-stone-600">
            {keyword.keyword}
          </span>
        </div>
      ))}
    </div>
  );
}
