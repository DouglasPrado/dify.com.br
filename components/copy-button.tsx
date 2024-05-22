"use client";

import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CopyButton({
  string,
  name,
  className,
}: {
  string: string;
  name?: string;
  className?: string;
}) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(string);
        toast.success("Código copiado com sucesso!");
        return true;
      }}
      className={cn(
        "flex w-full items-center justify-center gap-3 rounded-b-xl bg-black py-3 text-white",
        "shadow",
        className,
      )}
    >
      <Copy size={18} /> {name && <span className="text-sm">{name}</span>}
    </button>
  );
}
