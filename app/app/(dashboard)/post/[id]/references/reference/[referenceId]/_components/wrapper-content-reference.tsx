"use client";
import Editor from "./editor";

export default function WrapperContentReference({ data }: { data: any }) {
  return (
    <div className="flex w-full gap-3 overflow-y-hidden">
      <div className="w-full overflow-auto">
        <Editor reference={data} />
      </div>
    </div>
  );
}
