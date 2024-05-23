"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function BackButton({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="rounded-full bg-stone-100 p-2 hover:bg-stone-200"
    >
      <ArrowLeft />
    </button>
  );
}
