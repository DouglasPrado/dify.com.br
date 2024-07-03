"use client";

import { useModal } from "@/components/modal/provider";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export default function CreateTagButton({ children }: { children: ReactNode }) {
  const modal = useModal();
  return (
    <Button className="w-full" onClick={() => modal?.show(children)}>
      Criar nova tag
    </Button>
  );
}
