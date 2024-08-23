"use client";
import { Reference } from "@prisma/client";
import { Edit2, Link2, Text, Trash, Youtube } from "lucide-react";
import Link from "next/link";

export default function ReferenceCard({ data }: { data: Reference }) {
  return (
    <div className="relative flex flex-col gap-4 rounded-lg border border-stone-200 p-6 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">

      <div className="flex items-center gap-2 text-stone-700">
        {data.type === "url" && <Link2 size={24} />}
        {data.type === "youtube" && <Youtube size={24} />}
        {data.type === "text" && <Text size={24} />}
        <span className="break-all font-cal text-sm text-stone-600">
          {data.reference !== null ? data.reference : data.type}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-cal text-stone-700">
          {data.title || "(sem título)"}
        </div>
        <h3 className="font-cal text-sm text-stone-700">Conteúdo:</h3>
        <div
          className="line-clamp-6 text-xs font-light text-stone-500"
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
