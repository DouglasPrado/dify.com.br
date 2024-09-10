import { cn } from "@/lib/utils";

export default function ReviewItem({
  id,
  name,
  value,
}: {
  id: string;
  name: string;
  value: string;
}) {
  const percent = Number(value) * 10;
  return (
    <div>
      <span className="font-cal text-sm text-stone-800">{name}</span>
      <div className="flex items-center gap-1">
        <div className="relative w-[100%]">
          <div
            style={{ width: `${percent}%` }}
            className={cn(`absolute h-2 rounded-full bg-rose-500`)}
          />
          <div className="h-2 w-[100%] rounded-full bg-stone-200" />
        </div>
        <span className="text-xs text-stone-800">{value}</span>
      </div>
    </div>
  );
}
