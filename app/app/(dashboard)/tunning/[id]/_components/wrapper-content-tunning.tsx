"use client";
import Editor from "./editor";

export default function WrapperContentTunning({ data }: { data: any }) {
  return (
    <div className="flex w-full gap-3 overflow-y-hidden">
      <div className="w-full overflow-auto">
        <Editor tunning={data} />
      </div>
    </div>
  );
}
