"use client";
import { Button } from "@/components/ui/button";
import { reloadIdeas } from "@/lib/actions/ideas";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
export default function ReloadIdeas({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await reloadIdeas(id);
        toast.success("Estamos gerando novas ideias pra você!");
        router.refresh();
      }}
      className="flex gap-3"
    >
      {children}
    </Button>
  );
}
