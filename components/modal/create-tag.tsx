"use client";

import { createTag } from "@/lib/actions/tags";
import { useSiteStore } from "@/lib/stores/SiteStore";
import { useStudioStore } from "@/lib/stores/StudioStore";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { TwitterPicker } from "react-color";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import SelectIcon from "../form/select-icon";
import LoadingDots from "../icons/loading-dots";
import { useModal } from "./provider";

export default function CreateTagModal() {
  const siteId = useSiteStore((state) => state.siteId);
  const getTags = useStudioStore((state) => state.getTags);
  const router = useRouter();
  const modal = useModal();
  const [data, setData] = useState({
    siteId,
    name: "",
    color: "",
    colorText: "",
    icon: "",
  });

  const handleChangeComplete: any = useCallback((color: any) => {
    setData((prev: any) => ({
      ...prev,
      color: color.hex,
    }));
  }, []);

  const handleChangeTextComplete: any = useCallback((color: any) => {
    setData((prev: any) => ({
      ...prev,
      colorText: color.hex,
    }));
  }, []);

  return (
    <form
      action={async () => {
        createTag(data).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            siteId && getTags(siteId);
            va.track("Created Tag");
            router.refresh();
            modal?.hide();
            toast.success(`Successfully created tag!`);
          }
        });
      }}
      className="w-full rounded-md bg-white md:max-w-md md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700"
    >
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <h2 className="font-title text-2xl dark:text-white">Criar nova tag</h2>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Nome
          </label>
          <input
            name="name"
            type="text"
            placeholder="Digite o nome da tag"
            autoFocus
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            maxLength={32}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>

        <div className="flex w-full flex-col space-y-2">
          <label
            htmlFor="color"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Cor da tag
          </label>
          <TwitterPicker
            width="100%"
            colors={[
              "#FF6900",
              "#FCB900",
              "#7BDCB5",
              "#00D084",
              "#8ED1FC",
              "#0693E3",
              "#EB144C",
              "#F78DA7",
              "#9900EF",
              "#f3f4f6",
              "#111827",
            ]}
            color={data.color}
            onChangeComplete={handleChangeComplete}
          />
        </div>
        <div className="flex w-full flex-col space-y-2">
          <label
            htmlFor="colorText"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Cor do texto da tag
          </label>
          <TwitterPicker
            width="100%"
            color={data.colorText}
            colors={[
              "#f9fafb",
              "#f3f4f6",
              "#e5e7eb",
              "#d1d5db",
              "#9ca3af",
              "#6b7280",
              "#4b5563",
              "#1f2937",
              "#111827",
            ]}
            onChangeComplete={handleChangeTextComplete}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="icon"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Icone ( link para o lucide )
          </label>
          <SelectIcon
            onChange={(e: { value: string; label: string }) => {
              setData((prev) => ({ ...prev, icon: e.value }));
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 md:px-10 dark:border-stone-700 dark:bg-stone-800">
        <CreateTagFormButton />
      </div>
    </form>
  );
}
function CreateTagFormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Criar tag</p>}
    </button>
  );
}
