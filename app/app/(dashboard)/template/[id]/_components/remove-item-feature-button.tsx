"use client";

import LoadingCircle from "@/components/icons/loading-circle";
import { Button } from "@/components/ui/button";
import { removeItemFeature } from "@/lib/actions/template";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RemoveItemFeatureButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDeleteItem = async (id: string) => {
    setLoading(true);
    await removeItemFeature(id);
    setLoading(false);
    toast.success("Item adicionado com sucesso!");
    router.refresh();
  };
  return (
    <Button
      variant={"link"}
      className="flex w-full gap-3"
      onClick={() => handleDeleteItem(id)}
    >
      {!loading ? <Trash size={14} /> : <LoadingCircle />}
    </Button>
  );
}
