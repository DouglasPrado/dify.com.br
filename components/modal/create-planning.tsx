"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { createPostAutomaticAI } from "@/lib/actions/posts";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useModal } from "./provider";

export default function CreatePlanningModal({ type }: { type: string }) {
  const { id } = useParams() as { id: string };
  const modal = useModal();
  const router = useRouter();

  const [data, setData] = useState({
    keyword: "",
    scheduleAt: "",
    data: "",
    type,
    status: "waiting",
  });

  return (
    <form
      action={async (data: FormData) =>
        createPostAutomaticAI(data, id, null).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track(`Created Planning to product ${id}`);
            router.refresh();
            modal?.hide();
            toast.success(`Successfully created queue!`);
          }
        })
      }
      className="w-full rounded-md bg-white md:max-w-xl md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700"
    >
      <div className="border-b bg-stone-50 p-4">
        <h2 className="text-start font-cal text-xl text-stone-700 dark:text-white">
          Criação de conteúdo automatizado com I.A
        </h2>
      </div>
      <div className="relative flex flex-col space-y-3 p-5 md:p-6">
        <input name="type" type="hidden" value={type} />
        <input name="status" type="hidden" value={"waiting"} />
        <div className="flex flex-col space-y-2">
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-stone-500 dark:text-stone-400"
            >
              Palavra-chave
            </label>
            <p className="text-xs font-light text-gray-600 ">
              Adicione apenas uma palavra chave para iniciar a construção do
              conteúdo
            </p>
          </div>
          <input
            name="keyword"
            type="text"
            placeholder="Digite a palavra chave"
            autoFocus
            value={data.keyword}
            onChange={(e) => setData({ ...data, keyword: e.target.value })}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>

        {/* <div className="flex flex-col space-y-2">
          <div className="py-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-stone-500 dark:text-stone-400"
            >
              Data de agendamento
            </label>
            <p className="text-xs font-light text-gray-600 ">
              Adicione uma data para o lançamento da postagem
            </p>
          </div>
          <input
            name="scheduleAt"
            type="date"
            autoFocus
            value={data.scheduleAt}
            onChange={(e) => setData({ ...data, scheduleAt: e.target.value })}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div> */}

        {/* <div className="flex flex-col space-y-2">
          <div className="py-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-stone-500 dark:text-stone-400"
            >
              Descrição
            </label>
            <p className="text-xs font-light text-gray-600 ">
              Crie um resumo do que a página deverá ter.
            </p>
          </div>
          <textarea
            name="data"
            autoFocus
            value={data.data}
            onChange={(e) => setData({ ...data, data: e.target.value })}
            required
            rows={10}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          ></textarea>
        </div> */}
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 md:px-6 dark:border-stone-700 dark:bg-stone-800">
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
        <p>Criar conteúdo automático</p>
      )}
    </button>
  );
}
