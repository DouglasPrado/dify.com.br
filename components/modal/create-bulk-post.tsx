"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { bulkProduct } from "@/lib/actions/product";
import { useSettingsPostStore } from "@/lib/stores/SettingsPostStore";
import { useSiteStore } from "@/lib/stores/SiteStore";
import { cn } from "@/lib/utils";
import { Bolt } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import UploaderFile from "../form/uploader-file";
import { Textarea } from "../ui/textarea";
export default function CreateBulkPostModal({ type }: { type: string }) {
  const [siteId] = useSiteStore((state) => [state.siteId]);
  const [templates, getTemplates] = useSettingsPostStore((state) => [
    state.templates,
    state.getTemplates,
  ]);

  const [data, setData] = useState({
    file: null,
  });

  useEffect(() => {
    if (siteId && templates.length === 0) {
      getTemplates(siteId);
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form
      action={async (data: FormData) => {
        bulkProduct(data).then((res) => console.log(res));
      }}
      className="w-full rounded-xl bg-white md:max-w-xl md:border-stone-200 md:shadow-2xl dark:bg-black dark:md:border-stone-700"
    >
      <div className=" rounded-xl bg-stone-50 p-4">
        <h2 className="flex items-center gap-1 font-title text-2xl dark:text-white">
          <Bolt size={22} /> Configurações de artigos em massa
        </h2>
      </div>
      <div className="relative flex flex-col gap-3 p-5 md:p-6">
        <input name="type" type="hidden" value={type} />
        <input name="status" type="hidden" value={"waiting"} />
        <input name="siteId" type="hidden" value={`${siteId}`} />
        {type === "news" && (
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-stone-700">
              Notícias
            </span>
            <Textarea rows={5} className="bg-white hover:bg-stone-50/75" />
            <span className="py-2 text-xs font-light text-stone-700">
              Cola os sites separados por linha. Adicione sites de notícias para
              criar artigos.
            </span>
          </div>
        )}

        {type === "competition" && (
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-stone-700">
              Concorrência
            </span>
            <Textarea rows={5} className="bg-white hover:bg-stone-50/75" />
            <span className="py-2 text-xs font-light text-stone-700">
              Cola os sites separados por linha. Adicione sites de concorrêntes
              para criar artigos baseado nos artigos dos concorrêntes.
            </span>
          </div>
        )}

        {type === "keywords" && (
          <div className="flex flex-col">
            <div className="flex flex-col space-y-2 ">
              <span className="text-sm font-semibold text-stone-700">
                Palavras-chave por arquivo
              </span>
              <UploaderFile name="file" />
              <span className="text-xs font-light text-stone-700">
                Suba arquivo com a lista de palavras, máximo 2.000 palavras,
                cada palavra será um artigo.
              </span>
            </div>
            <div className="relative my-4 flex items-center justify-center border-b">
              <span className="absolute -top-3 bg-white px-3 text-sm font-light text-stone-500">
                ou
              </span>
            </div>
            <span className="text-sm font-semibold text-stone-700">
              Palavras-chave por texto
            </span>
            <Textarea rows={5} className="bg-white hover:bg-stone-50/75" />
            <span className="py-2 text-xs font-light text-stone-700">
              Cola as palavras separadas por linha. Máximo 2.000 palavras, cada
              palavra será um artigo.
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-stone-200 bg-stone-50 p-3 md:px-6 dark:border-stone-700 dark:bg-stone-800">
        <CreateClusterFormButton />
      </div>
    </form>
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
      {pending ? <LoadingDots color="#808080" /> : <p>Gerar artigos</p>}
    </button>
  );
}
