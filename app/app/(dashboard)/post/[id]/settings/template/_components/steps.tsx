import Icon from "@/components/global/icon";
import { cn } from "@/lib/utils";

export default async function Steps({
  steps,
}: {
  steps: {
    name: string;
    index: string;
    selected: boolean;
  }[];
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-4 md:flex md:gap-0 md:space-x-8">
      {steps.map((step: any, idx: number) => (
        <>
          <div key={`key-step-${idx}`} className="flex items-center gap-2">
            <span
              className={cn(
                step.selected
                  ? " border-stone-900 font-cal text-stone-900"
                  : "text-stone-500",
                "flex h-10 w-10 items-center justify-center rounded-full border  p-2 shadow",
              )}
            >
              {step.index}
            </span>
            <strong
              className={cn(
                step.selected
                  ? " font-cal text-stone-700"
                  : "font-light text-stone-500",
                " text-sm ",
              )}
            >
              {step.name}
            </strong>
          </div>
          <Icon
            icon={"ChevronsRight"}
            size="22"
            className="text-stone-500 last:hidden"
          />
        </>
      ))}
    </div>
  );
}
