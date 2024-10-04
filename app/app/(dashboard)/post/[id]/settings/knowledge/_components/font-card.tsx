"use client";
import Icon from "@/components/global/icon";
import { TypeKnowledge, useKnowledgeStore } from "@/lib/stores/KnowledgeStore";
import { cn } from "@/lib/utils";
import { FC, ReactElement, useCallback } from "react";

type FontCardProps = {
  name: TypeKnowledge;
  label: string;
  description: string;
  icon: string;
};

const FontCard: FC<FontCardProps> = ({
  name,
  label,
  description,
  icon,
}: FontCardProps): ReactElement => {
  const [type, setType] = useKnowledgeStore((state) => [
    state.type,
    state.setType,
  ]);
  const handleType = useCallback(
    (input: TypeKnowledge) => {
      setType(input);
    },
    [setType],
  );
  return (
    <div
      onClick={() => handleType(name)}
      className={cn(
        type === name ? "border-stone-900 text-stone-900" : "text-stone-500",
        "hover:-transform-y-1 relative flex cursor-pointer items-center space-x-4 rounded-lg border px-4  py-3 transition-all hover:border-stone-900 hover:text-stone-700",
      )}
    >
      <Icon icon={icon} size="22" className="" />
      <div className="flex flex-col ">
        <h3 className="font-cal text-sm ">{label}</h3>
        <span className="text-xs text-stone-500">{description}</span>
      </div>
      {type === name && (
        <div className="absolute -bottom-1 -right-1 rounded-full bg-black p-0.5">
          <Icon icon="Check" className="text-white" />
        </div>
      )}
    </div>
  );
};

export default FontCard;
