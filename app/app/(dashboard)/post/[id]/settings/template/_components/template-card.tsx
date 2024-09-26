"use client";
import Icon from "@/components/global/icon";
import {
  TypeSettingsPost,
  useSettingsPostStore,
} from "@/lib/stores/SettingsPostStore";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { FC, ReactElement, useCallback, useEffect } from "react";

type TemplatCardProps = {
  name: TypeSettingsPost;
  label: string;
  description: string;
  icon: string;
  defaultValue: TypeSettingsPost;
};

const TemplateCard: FC<TemplatCardProps> = ({
  name,
  label,
  description,
  icon,
  defaultValue,
}: TemplatCardProps): ReactElement => {
  const { id } = useParams() as { id: string };
  const [type, setType] = useSettingsPostStore((state) => [
    state.type,
    state.setType,
  ]);

  useEffect(() => {
    if (type === null) {
      setType(defaultValue, id);
    }
  });

  const handleType = useCallback(
    (input: TypeSettingsPost) => {
      setType(input, id);
    },
    [setType, id],
  );
  return (
    <div
      onClick={() => handleType(name)}
      className={cn(
        type === name ? "border-stone-900 text-stone-900" : "text-stone-500",
        "hover:-transtone-y-1 relative flex cursor-pointer items-center space-x-4 rounded-lg border px-4  py-3 transition-all hover:border-stone-900 hover:text-stone-700",
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

export default TemplateCard;
