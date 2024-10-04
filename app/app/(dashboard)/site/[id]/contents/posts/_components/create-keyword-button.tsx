"use client";

import { useModal } from "@/components/modal/provider";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export default function CreatePostKeywordButton({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const modal = useModal();
  return (
    <Button onClick={() => modal?.show(children)}>
      <span>{title}</span>
    </Button>
  );
}
