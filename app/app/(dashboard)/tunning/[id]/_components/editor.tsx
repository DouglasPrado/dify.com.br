"use client";
import NovelEditor from "@/components/editor/editor";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  updateContentTunning,
  updateContentTunningMetadata,
} from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Columnist } from "@prisma/client";
import { SlidersVertical } from "lucide-react";
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
  }, [data, tunning.id]);
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

  const handleOnChange = useCallback(
    (editor: any) => {
      setData((prev: any) => ({
        ...prev,
        prompt: editor?.storage?.markdown?.getMarkdown(),
      }));
      startTransitionSaving(async () => {
        await updateContentTunning(tunning.id, data);
      });
    },
    [data, tunning.id],
  );

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
      <div className="grid gap-6 py-6 lg:grid-cols-1">
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="type"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Publicar automáticamente
          </label>
          <Switch
            defaultChecked={tunning.published}
            onCheckedChange={(value: any) => {
              console.log(value);
              const formData = new FormData();
              formData.append("published", value);
              updateContentTunningMetadata(formData, tunning, "published");
              toast.success(`Successfully update tunning.`);
            }}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="type"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Limite de palavras
          </label>
          <Input
            placeholder="limite de palavras"
            defaultValue={tunning.limitWords}
            onChange={(e: any) => {
              setData((prev: any) => ({
                ...prev,
                limitWords: e.target.value,
              }));
            }}
          />
        </div>
      </div>
      <div className="grid gap-6 py-6 lg:grid-cols-2">
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="type"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Largura da imagem de destaque
          </label>
          <Input
            placeholder="limite de palavras"
            defaultValue={tunning.widthImage}
            onChange={(e: any) => {
              setData((prev: any) => ({
                ...prev,
                widthImage: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="type"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Altura da imagem de destaque
          </label>
          <Input
            type="number"
            placeholder="limite de palavras"
            defaultValue={tunning.heightImage}
            onChange={(e: any) => {
              setData((prev: any) => ({
                ...prev,
                heightImage: e.target.value,
              }));
            }}
          />
        </div>
      </div>
      <div className="grid gap-2 py-6 lg:grid-cols-2">
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="type"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Colunista padrão
          </label>
          <Select
            name="columnistId"
            defaultValue={tunning.columnistId}
            onValueChange={(value) => {
              const formData = new FormData();
              formData.append("columnistId", value);
              updateContentTunningMetadata(formData, tunning, "columnistId");
              toast.success(`Successfully update tunning.`);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o colunista" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Colunista padrão</SelectLabel>
                {tunning.site.columnists.map(
                  (columnist: Columnist, idx: number) =>
                    columnist.name && (
                      <SelectItem
                        key={`colunist-select-${idx}`}
                        value={columnist.id}
                      >
                        {columnist.name}
                      </SelectItem>
                    ),
                )}
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
      <NovelEditor initialValue={tunning.prompt} onChange={handleOnChange} />
    </div>
  );
}
