"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import { SlidersVertical } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import "react-quill/dist/quill.snow.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useModal } from "./provider";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function CreateContentTunningModal() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const modal = useModal();
  const [value, setValue] = useState("");
  const [data, setData] = useState({
    interface: "blog",
    type: "",
    content: value,
  });

  return (
    <form
      action={
        async (data: FormData) => {}
        // createContentTunning(data, id).then((res: any) => {
        //   if (res.error) {
        //     toast.error(res.error);
        //   } else {
        //     va.track("Created Site");
        //     const { id } = res;
        //     router.refresh();
        //     modal?.hide();
        //     toast.success(`Successfully created site!`);
        //   }
        // })
      }
      className="w-full rounded-md bg-white md:max-w-2xl md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700"
    >
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <div className="flex items-center gap-1">
          <SlidersVertical />
          <h2 className="font-title text-2xl dark:text-white">Fine Tunning</h2>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="type"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Tipo
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipo</SelectLabel>
                <SelectItem value="example">Example</SelectItem>
                <SelectItem value="outlines">Outlines</SelectItem>
                <SelectItem value="topics">Topics</SelectItem>
                <SelectItem value="estructure">Estructure</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="interface"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Interface
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a interface" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Interface</SelectLabel>
                <SelectItem value="advertising">Advertising</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
                <SelectItem value="page">Page</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="max-h-96 space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-normal text-stone-700"
          >
            Faça a contextualização para o conteúdo
          </label>
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 md:px-10 dark:border-stone-700 dark:bg-stone-800">
        <CreateTunningFormButton />
      </div>
    </form>
  );
}
function CreateTunningFormButton() {
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
      {pending ? <LoadingDots color="#808080" /> : <p>Aplicar tunning</p>}
    </button>
  );
}
