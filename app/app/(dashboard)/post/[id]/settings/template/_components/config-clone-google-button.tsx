"use client";

import { useModal } from "@/components/modal/provider";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export default function ConfigCloneGoogleButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();
  return (
    <Button className="flex w-full gap-3" onClick={() => modal?.show(children)}>
      Criar produto a partir desse
    </Button>
  );
}
