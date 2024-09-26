"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Media } from "@prisma/client";
import { FolderSearch } from "lucide-react";
import MediaCard from "./media-card";

export default function Medias({ medias }: { medias: Media[] }) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <Command className="bg-transparent">
        <CommandList className="max-h-full pb-40 pt-3">
          <CommandEmpty>Não tem imagens</CommandEmpty>
          <CommandGroup heading="Arquivos de imagens">
            <div className="flex flex-wrap gap-4 pt-4">
              {medias?.map((file) => (
                <CommandItem
                  key={file.id}
                  className="w-full max-w-[300px] rounded-lg !bg-transparent p-0 !font-medium !text-white"
                >
                  <MediaCard file={file} />
                </CommandItem>
              ))}
              {!medias?.length && (
                <div className="flex w-full flex-col items-center justify-center">
                  <FolderSearch
                    size={200}
                    className="dark:text-muted text-stone-300"
                  />
                  <p className="text-muted-foreground ">
                    Empty! no files to show.
                  </p>
                </div>
              )}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
