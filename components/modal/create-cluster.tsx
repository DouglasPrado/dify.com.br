"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { createWhitelist } from "@/lib/actions";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useModal } from "./provider";

export default function CreateClusterModal() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const modal = useModal();

  const [data, setData] = useState({
    utm_source: "",
    utm_campaign: "",
    utm_medium: "",
  });

  return (
    <form
      action={async (data: FormData) =>
        createWhitelist(data, id, null).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track(`Created Whitelist to product ${id}`);
            router.refresh();
            router.push(`/product/${id}`);
            modal?.hide();
            toast.success(`Successfully created whitelist!`);
          }
        })
      }
      className="w-full rounded-md bg-white md:max-w-md md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700"
    >
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <h2 className="font-title text-2xl dark:text-white">
          Criar link de rastreamento
        </h2>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Origem da campanha
          </label>
          <p className="text-xs font-light text-gray-600">
            A origem do tráfego, ou seja, de qual site, anunciante ou publicação
            veio o usuário.
          </p>
          <input
            name="utm_source"
            type="text"
            placeholder="Digite a origem ex: facebook.com"
            autoFocus
            value={data.utm_source}
            onChange={(e) => setData({ ...data, utm_source: e.target.value })}
            maxLength={32}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Nome da campanha
          </label>
          <p className="text-xs font-light text-gray-600">
            O nome da campanha que define determinado contexto de marketing
            (exemplos: natal, lancamento, promo01).
          </p>
          <input
            name="utm_campaign"
            type="text"
            placeholder="Digite o nome da campanha"
            autoFocus
            value={data.utm_campaign}
            onChange={(e) => setData({ ...data, utm_campaign: e.target.value })}
            maxLength={32}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Publicidade
          </label>
          <p className="text-xs font-light text-gray-600">
            a mídia de publicidade ou marketing usada para chegar ao seu site
            (exemplos: banner, cpc, newsletter)
          </p>
          <input
            name="utm_medium"
            type="text"
            placeholder="Digite o nome da campanha"
            autoFocus
            value={data.utm_medium}
            onChange={(e) => setData({ ...data, utm_medium: e.target.value })}
            maxLength={32}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 md:px-10 dark:border-stone-700 dark:bg-stone-800">
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
      {pending ? (
        <LoadingDots color="#808080" />
      ) : (
        <p>Criar link de rastreamento</p>
      )}
    </button>
  );
}
