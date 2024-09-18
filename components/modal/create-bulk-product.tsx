"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { Form } from "@/components/ui/form";
import { useSettingsPostStore } from "@/lib/stores/SettingsPostStore";
import { useSiteStore } from "@/lib/stores/SiteStore";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bolt, FolderUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UploaderFile from "../form/uploader-file";

export default function CreateBulkProductModal({ type }: { type: string }) {
  const [siteId] = useSiteStore((state) => [state.siteId]);
  const [templates, getTemplates] = useSettingsPostStore((state) => [
    state.templates,
    state.getTemplates,
  ]);

  const FormSchema = z.object({
    template: z.string({
      required_error: "Selecione um template",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (siteId && templates.length === 0) {
      getTemplates(siteId);
    }
  });

  const [data, setData] = useState({
    name: "",
    scheduleAt: "",
    data: "",
    type,
    status: "waiting",
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full rounded-md bg-white md:max-w-xl md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700"
      >
        <div className="border-b bg-stone-50 p-4">
          <h2 className="flex items-center gap-1 font-title text-2xl dark:text-white">
            <Bolt size={22} /> Configurações de produto em massa
          </h2>
        </div>
        <div className="relative flex flex-col gap-3 p-5 md:p-6">
          <input name="type" type="hidden" value={type} />
          <input name="status" type="hidden" value={"waiting"} />

          <div className="flex flex-col space-y-2">
              <UploaderFile name="file" />
          </div>
        </div>
        <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 md:px-6 dark:border-stone-700 dark:bg-stone-800">
          <CreateClusterFormButton />
        </div>
      </form>
    </Form>
  );
}
function CreateClusterFormButton() {
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
      {pending ? <LoadingDots color="#808080" /> : <p>Criar produto</p>}
    </button>
  );
}
