"use client";

import { cn } from "@/lib/utils";
import { FolderUp } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function UploaderFile({
  defaultValue,
  name,
  fit = false,
}: {
  defaultValue?: string | null;
  name: string;
  fit?: boolean;
}) {
  const aspectRatio =
    name === "image" || "videoThumbnail" ? "aspect-video" : "aspect-square";

  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>(null);
  const [data, setData] = useState({
    [name]: defaultValue,
  });
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = (file: File | null) => {
    console.log(file);
    setFile(file);
    if (file) {
      if (file.size / 1024 / 1024 > 50) {
        toast.error("File size too big (max 50MB)");
      } else if (
        !file.type.includes("csv") &&
        !file.type.includes(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
      ) {
        toast.error("O Tipo deverá ser CSV ou XLSX");
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          setData((prev) => ({ ...prev, [name]: e.target?.result as string }));
        };
        reader.readAsDataURL(file);
      }
    }
  };
  console.log(data);
  return (
    <div>
      <label
        htmlFor={`${name}-upload`}
        className={cn(
          "relative flex w-full cursor-pointer flex-col items-center justify-center rounded-md  py-3 text-sm text-stone-600 shadow-sm transition-all placeholder:text-stone-400 hover:bg-stone-50 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
          data.file
            ? "border border-dashed border-emerald-800 bg-emerald-50"
            : "border border-dashed border-stone-200",
        )}
      >
        <div
          className="absolute z-[5] h-full w-full rounded-md"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            const file = e.dataTransfer.files && e.dataTransfer.files[0];
            inputRef.current!.files = e.dataTransfer.files; // set input file to dropped file
            handleUpload(file);
          }}
        />
        <div className="flex w-full flex-col px-6 py-10">
          <FolderUp
            className={cn(
              "mx-auto h-12 w-12 ",
              file ? "text-emerald-900" : "text-stone-800",
            )}
          />
          {!file ? (
            <div className="flex flex-col">
              <p className="mt-2 text-center text-sm text-stone-700">
                Faça o upload do arquivo em CSV ou XLSX.
              </p>
              <p className="mt-2 text-center text-sm text-stone-700">
                Tamanho máximo do arquivo: 20MB
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              <p className="mt-2 text-center font-cal text-lg text-emerald-900">
                {file.name}
              </p>
            </div>
          )}
        </div>
      </label>
      <div className="flex rounded-md shadow-sm">
        <input
          id={`${name}-upload`}
          ref={inputRef}
          name={name}
          type="file"
          className="sr-only"
          onChange={(e) => {
            const file = e.currentTarget.files && e.currentTarget.files[0];
            handleUpload(file);
          }}
        />
      </div>
    </div>
  );
}
