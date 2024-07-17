"use client";

import { createCollection } from "@/lib/actions";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { useParams, useRouter } from "next/navigation";
import { ReactNode, useTransition } from "react";

export default function CreateLinkCollection({
  children,
  siteId,
  type,
  color,
}: {
  children: ReactNode;
  siteId: string;
  type: string;
  color: string;
}) {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [isPending, startTransition] = useTransition();
  return (
    <button
      onClick={() =>
        startTransition(async () => {
          const formData = new FormData();
          formData.append("type", type);
          formData.append("link", id);
          const collection = await createCollection(formData, siteId, null);
          console.log(collection);
          va.track("Created Link Collection");
          router.push(`/collection/${collection.id}/${collection.type}`);
        })
      }
      className={cn(
        "flex items-center justify-start gap-6 rounded-xl ",
        `bg-${color}-100 p-6 hover:bg-${color}-200`,
      )}
    >
      {children}
    </button>
  );
}
