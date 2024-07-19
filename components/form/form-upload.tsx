"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import Uploader from "./uploader";

export default function FormUpload({
  inputAttrs,
  handleSubmit,
  formButton = true,
  data,
}: {
  inputAttrs: {
    name: string;
    type: string;
    defaultValue?: string;
    placeholder?: string;
    maxLength?: number;
    required?: boolean;
    pattern?: string;
    inputs?: {
      name: string;
      type: string;
      defaultValue: string;
      placeholder?: string;
      maxLength?: number;
      required?: boolean;
      pattern?: string;
    }[];
  };
  data?: any[];
  handleSubmit: any;
  formButton?: boolean;
}) {
  const { id } = useParams() as { id?: string };
  const router = useRouter();
  const { update } = useSession();
  return (
    <form
      action={async (data: FormData) => {
        handleSubmit(data, id, inputAttrs.name).then(async (res: any) => {
          if (res?.error) {
            toast?.error(res?.error);
          } else {
            va.track(`Updated ${inputAttrs.name}`, id ? { id } : {});
            if (id) {
              router.refresh();
            } else {
              await update();
              router.refresh();
            }
            toast.success(`Successfully updated ${inputAttrs.name}!`);
          }
        });
      }}
      className="flex w-full items-center justify-between gap-2 "
    >
      {inputAttrs.name === "image" ||
      inputAttrs.name === "logo" ||
      inputAttrs.name === "favicon" ||
      inputAttrs.name === "logoFooter" ||
      inputAttrs.name === "videoThumbnail" ||
      inputAttrs.name === "media" ? (
        <Uploader
          defaultValue={inputAttrs.defaultValue!}
          name={inputAttrs.name}
        />
      ) : (
        <input
          {...inputAttrs}
          className="w-full rounded-md text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
        />
      )}
      {formButton ? <FormButton /> : null}
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex items-center justify-center rounded p-2",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border border-black bg-black text-white hover:bg-white hover:text-black  dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <Save size={16} />}
    </button>
  );
}
