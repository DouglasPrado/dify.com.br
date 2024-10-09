"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BackButton({ link }: { link?: string }) {
  const router = useRouter();
  return link ? (
    <Link
      href={link}
      className="w-10 rounded-full bg-stone-100 p-2 hover:bg-stone-200"
    >
      <ArrowLeft />
    </Link>
  ) : (
    <button
      onClick={() => router.back()}
      className="w-10 rounded-full bg-stone-100 p-2 hover:bg-stone-200"
    >
      <ArrowLeft />
    </button>
  );
}
