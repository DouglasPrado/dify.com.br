"use client";
import { Button } from "@/components/ui/button";
import { syncTemplateProduct } from "@/lib/actions/product";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
export default function SyncTemplateProduct({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await syncTemplateProduct(id);
        toast.success("Estamos sincronizandos com o template de produtos!");
        router.refresh();
      }}
      className="flex gap-3"
    >
      {children}
    </Button>
  );
}
