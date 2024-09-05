"use client";

import { useModal } from "@/components/modal/provider";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ReactNode } from "react";

export default function CreateReviewButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();
  return (
    <Button className="flex w-full gap-3" onClick={() => modal?.show(children)}>
      <Plus size={16} /> Novo
    </Button>
  );
}
