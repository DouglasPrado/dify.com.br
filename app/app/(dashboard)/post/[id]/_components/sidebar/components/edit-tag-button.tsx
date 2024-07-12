"use client";

import { useModal } from "@/components/modal/provider";
import { Edit2 } from "lucide-react";
import { ReactNode } from "react";

export default function EditTagButton({
  data,
  children,
}: {
  data: any;
  children: ReactNode;
}) {
  const modal = useModal();
  return (
    <button
      onClick={() => modal?.show(children)}
      className="rounded bg-black/10 p-1"
    >
      <Edit2
        style={{
          color: data.colorText,
        }}
        size={12}
      />
    </button>
  );
}
