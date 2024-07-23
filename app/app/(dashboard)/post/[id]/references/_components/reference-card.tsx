"use client";
import { Reference } from "@prisma/client";
import { Edit2, Trash } from "lucide-react";
import Link from "next/link";

export default function ReferenceCard({ data }: { data: Reference }) {
  return (
    <div className="relative rounded-lg border border-stone-200 p-6 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <div className="flex gap-2">
        <h3 className="font-cal text-sm">Tipo:</h3>
        <span className="font-cal text-sm text-stone-600">
          {data.type} {data.reference}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-cal text-sm">Conteúdo:</h3>
        <div
          className="line-clamp-6"
          dangerouslySetInnerHTML={{ __html: `${data.content}` }}
        />
      </div>
      <div className="flex items-center gap-3">
        <Link href={`/post/${data.postId}/references/reference/${data.id}`}>
          <Edit2 className="text-stone-500" size={14} />
        </Link>
        <Link href={`/post/${data.postId}/references/reference/${data.id}`}>
          <Trash className="text-rose-500" size={14} />
        </Link>
      </div>
    </div>
  );
}
