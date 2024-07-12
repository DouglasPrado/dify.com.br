"use client";
import Icon from "@/components/global/icon";

export default function TagCard({ data }: any) {
  return (
    <div
      className="flex items-center justify-between gap-3 rounded px-3 py-2"
      style={{ backgroundColor: data.color }}
    >
      <Icon icon={data.icon} style={{ color: data.colorText }} />
      <div className="flex w-full flex-col">
        <h4
          className="font-title text-xs text-stone-800"
          style={{ color: data.colorText }}
        >
          {data.name}
        </h4>
      </div>
      {/* <MagicButton >
        <MagicApplyModal type={data.type} />
      </MagicButton> */}
    </div>
  );
}
