"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  updateContentTunning,
  updateContentTunningMetadata,
} from "@/lib/actions";
import { cn } from "@/lib/utils";
import { SlidersVertical } from "lucide-react";
import { Editor as NovelEditor } from "novel";
import { useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export default function Editor({ tunning }: any) {
  let [isPendingSaving, startTransitionSaving] = useTransition();
  let [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState(tunning);
  const handleSubmit = useCallback(() => {
    startTransitionSaving(async () => {
      await updateContentTunning(tunning.id, data);
    });
  }, [data, tunning.id])
  // listen to CMD + S and override the default behavior
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "s") {
        e.preventDefault();
        handleSubmit();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [tunning, startTransitionSaving, data, handleSubmit]);

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg  p-6 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:px-12 dark:border-stone-700 ">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <SlidersVertical />
          <h1 className="w-60 truncate font-title text-xl font-bold sm:w-auto sm:text-3xl dark:text-white">
            Fine Tunning
          </h1>
        </div>
        <button
          onClick={handleSubmit}
          className={cn(
            isPendingSaving
              ? "bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-500"
              : "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-300",
            "w-28 rounded-lg px-2 py-2 text-sm ",
          )}
        >
          {isPendingSaving ? "Salvando..." : "Salvar"}
        </button>
      </div>
      <div className="grid gap-2 py-6 lg:grid-cols-2">
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="type"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Tipo
          </label>
          <Select
            name="type"
            defaultValue={tunning.type}
            onValueChange={(value) => {
              const formData = new FormData();
              formData.append("type", value);
              updateContentTunningMetadata(formData, tunning, "type");
              toast.success(`Successfully update tunning.`);
            }}
          >
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
          <Select
            name="interface"
            defaultValue={tunning.interface}
            onValueChange={(value) => {
              const formData = new FormData();
              formData.append("interface", value);
              updateContentTunningMetadata(formData, tunning, "interface");
              toast.success(`Successfully update tunning.`);
            }}
          >
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
      </div>
      <NovelEditor
        className="relative block bg-stone-100"
        defaultValue={tunning.content || ""}
        storageKey={tunning.id}
        onUpdate={(editor: any) =>
          setData((prev: any) => ({
            ...prev,
            content: editor?.storage.markdown.getMarkdown(),
          }))
        }
        onDebouncedUpdate={() => {
          if (tunning.content === tunning.content) {
            return;
          }
          startTransitionSaving(async () => {
            await updateContentTunning(tunning.id, data);
          });
        }}
      />
    </div>
  );
}
