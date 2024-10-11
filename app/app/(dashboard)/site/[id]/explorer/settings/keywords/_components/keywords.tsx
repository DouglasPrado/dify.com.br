import { Keyword } from "@prisma/client";
import AlertDeleteKeyword from "./alert-delete-keyword";

export default function KeywordsCard({ data }: { data: Keyword[] }) {
  return (
    <div className="flex w-full flex-wrap gap-2 ">
      {data.map((keyword: Keyword, idx: number) => (
        <AlertDeleteKeyword
          key={`key-keyword-${keyword.id}-${idx}`}
          keyword={keyword}
        />
      ))}
    </div>
  );
}
