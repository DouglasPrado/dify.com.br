export default function KnowledgeCard({ data }: { data: any }) {
  return (
    <div className="group col-span-1 flex min-h-[160px] cursor-pointer flex-col rounded-xl border border-solid border-stone-100 bg-white shadow-sm transition-all duration-200 ease-in-out hover:shadow-lg">
      <div className="flex h-[66px] shrink-0 grow-0 items-center gap-3 px-[14px] pb-3 pt-[14px]">
        <div className="flex shrink-0 items-center justify-center rounded-md border-[0.5px] border-stone-100 bg-stone-50 p-2.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-stone-600"
            data-icon="Folder"
            aria-hidden="true"
          >
            <g id="Icon">
              <path
                id="Solid"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.666993 4.10794C0.666981 3.75652 0.666972 3.45333 0.687374 3.20362C0.708908 2.94006 0.756452 2.67791 0.884981 2.42566C1.07673 2.04933 1.38269 1.74337 1.75901 1.55163C2.01127 1.4231 2.27341 1.37555 2.53698 1.35402C2.78669 1.33362 3.08986 1.33363 3.4413 1.33364L6.0981 1.33357C6.4938 1.33304 6.84179 1.33258 7.16176 1.44295C7.44201 1.53961 7.69726 1.69737 7.90905 1.9048C8.15086 2.14164 8.30607 2.45309 8.48257 2.80725L9.07895 4.00016H11.4945C12.0312 4.00015 12.4741 4.00015 12.8349 4.02963C13.2096 4.06024 13.5541 4.12595 13.8776 4.29081C14.3794 4.54648 14.7873 4.95442 15.043 5.45619C15.2079 5.77975 15.2736 6.12421 15.3042 6.49895C15.3337 6.85974 15.3337 7.30264 15.3337 7.83928V10.8277C15.3337 11.3644 15.3337 11.8073 15.3042 12.168C15.2736 12.5428 15.2079 12.8872 15.043 13.2108C14.7873 13.7126 14.3794 14.1205 13.8776 14.3762C13.5541 14.541 13.2096 14.6068 12.8349 14.6374C12.4741 14.6668 12.0312 14.6668 11.4945 14.6668H4.50614C3.9695 14.6668 3.52657 14.6668 3.16578 14.6374C2.79104 14.6068 2.44658 14.541 2.12302 14.3762C1.62125 14.1205 1.2133 13.7126 0.957643 13.2108C0.792782 12.8872 0.727073 12.5428 0.696456 12.168C0.666978 11.8073 0.666985 11.3643 0.666993 10.8277V4.10794ZM6.01519 2.66697C6.54213 2.66697 6.64658 2.67567 6.727 2.70341C6.82041 2.73563 6.9055 2.78822 6.97609 2.85736C7.03687 2.91688 7.09136 3.00642 7.32701 3.47773L7.58823 4.00016L2.00038 4.00016C2.00067 3.69017 2.00271 3.47827 2.01628 3.3122C2.03108 3.13109 2.05619 3.06394 2.07299 3.03098C2.13691 2.90554 2.23889 2.80355 2.36433 2.73964C2.3973 2.72284 2.46444 2.69772 2.64555 2.68292C2.83444 2.66749 3.08263 2.66697 3.46699 2.66697H6.01519Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </div>
        <div className="w-0 grow py-[1px]">
          <div className="flex items-center text-sm font-semibold leading-5 text-stone-800">
            <div className="truncate" title="Site principal">
              Site principal
            </div>
          </div>

          <div className="mt-[1px] flex flex-col items-start text-xs leading-[18px] text-stone-500">
            <div
              className="truncate opacity-50"
              title="0 documentos · 0 k palavras"
            >
              <span>0 documentos</span>
              <span className="mx-0.5 w-1 shrink-0 text-stone-400">·</span>
              <span>0 k palavras</span>
              <span className="mx-0.5 w-1 shrink-0 text-stone-400">·</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 line-clamp-4 max-h-[72px] grow px-[14px] text-xs leading-normal text-stone-500 ">
        <div className="mb-1 line-clamp-4 px-4 text-xs leading-normal text-stone-500">
          Importe seus próprios dados de texto ou escreva dados em tempo real
          via Webhook para aprimoramento de contexto LLM.
        </div>
      </div>
    </div>
  );
}
