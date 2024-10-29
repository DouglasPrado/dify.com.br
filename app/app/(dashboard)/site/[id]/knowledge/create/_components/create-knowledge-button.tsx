"use client";

import { useModal } from "@/components/modal/provider";
import { ReactNode } from "react";

export default function CreateKnowledgeButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();
  return (
    <button onClick={() => modal?.show(children)}>
      <div className="group col-span-1 flex min-h-[160px] cursor-pointer flex-col rounded-xl border-[0.5px] border-black/5 bg-stone-200 transition-all duration-200 ease-in-out hover:bg-white hover:shadow-lg">
        <div className="flex shrink-0 items-center p-4 pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 bg-stone-100">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="remixicon h-4 w-4 text-stone-500"
            >
              <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
            </svg>
          </div>
          <div className="group-hover:text-primary-600 ml-3 text-sm font-semibold leading-5 text-stone-800">
            Criar Conhecimento
          </div>
        </div>
        <div className="mb-1 line-clamp-4 px-4 text-left text-xs leading-normal text-stone-500">
          Importe seus próprios dados de texto ou escreva dados em tempo real
          via Webhook para aprimoramento de contexto LLM.
        </div>
      </div>
    </button>
  );
}
