"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import BlurImage from "../global/blur-image";
import DeleteProductSectionForm from "./delete-product-section-form";
import DomainConfiguration from "./domain-configuration";
import DomainStatus from "./domain-status";
import Uploader from "./uploader";

export default function Form({
  title,
  description,
  helpText,
  inputAttrs,
  handleSubmit,
  formButton = true,
  data,
}: {
  title: string;
  description: string;
  helpText: string;
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
        if (
          inputAttrs.name === "customDomain" &&
          inputAttrs.defaultValue &&
          data.get("customDomain") !== inputAttrs.defaultValue &&
          !confirm("Are you sure you want to change your custom domain?")
        ) {
          return;
        }
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
      className="h-full w-full rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black"
    >
      <div className="flex h-full w-full flex-col justify-between">
        <div className="relative flex h-full flex-col space-y-4 p-5 sm:p-10">
          {title && (
            <h2 className="font-title text-xl dark:text-white">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {description}
            </p>
          )}
          <div className="flex flex-col gap-8 ">
            {data?.map((item: any, idxItem: number) => (
              <div
                key={idxItem}
                className="flex items-center justify-between gap-12"
              >
                <div className="flex w-full justify-between ">
                  {inputAttrs.inputs?.map((input: any, idxInput: number) => {
                    return input.name === "image" ? (
                      <div
                        key={idxInput}
                        className="flex flex-col text-sm text-stone-500 dark:text-stone-400"
                      >
                        {input.name === "image" && (
                          <BlurImage
                            alt="Imagem"
                            width={120}
                            height={120}
                            src={JSON.parse(item.content)[input.name]}
                            className="rounded-lg border"
                          />
                        )}
                      </div>
                    ) : (
                      <div
                        key={idxInput}
                        className="flex flex-col text-sm text-stone-500 dark:text-stone-400"
                      >
                        <span className="line-clamp-1 w-full font-title">
                          {input.placeholder}
                        </span>
                        <div
                          className="w-full "
                          dangerouslySetInnerHTML={{
                            __html: `${JSON.parse(item.content)[input.name]}`,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-3">
                  <DeleteProductSectionForm
                    id={item.id}
                    key={`key-button-${idxItem}`}
                  />
                </div>
              </div>
            ))}
          </div>
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
          ) : inputAttrs.name === "font" ? (
            <div className="flex max-w-sm items-center overflow-hidden rounded-lg border border-stone-600">
              <select
                name="font"
                defaultValue={inputAttrs.defaultValue}
                className="w-full rounded-none border-none bg-white px-4 py-2 text-sm font-medium text-stone-700 focus:outline-none focus:ring-black dark:bg-black dark:text-stone-200 dark:focus:ring-white"
              >
                <option value="font-title">Cal Sans</option>
                <option value="font-lora">Lora</option>
                <option value="font-work">Work Sans</option>
              </select>
            </div>
          ) : inputAttrs.name === "pageMain" ? (
            <div className="flex max-w-sm items-center overflow-hidden rounded-lg border border-stone-600">
              <select
                name="pageMain"
                defaultValue={inputAttrs.defaultValue}
                className="w-full rounded-none border-none bg-white px-4 py-2 text-sm font-medium text-stone-700 focus:outline-none focus:ring-black dark:bg-black dark:text-stone-200 dark:focus:ring-white"
              >
                <option value="blog">Blog</option>
                <option value="link">Link da bio</option>
                <option value="ecommerce">Loja virtual</option>
              </select>
            </div>
          ) : inputAttrs.name === "subdomain" ? (
            <div className="flex w-full max-w-md">
              <input
                {...inputAttrs}
                required
                className="z-10 flex-1 rounded-l-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
              />
              <div className="flex items-center rounded-r-md border border-l-0 border-stone-300 bg-stone-100 px-3 text-sm dark:border-stone-600 dark:bg-stone-800 dark:text-stone-400">
                {process.env.NEXT_PUBLIC_ROOT_DOMAIN}
              </div>
            </div>
          ) : inputAttrs.name === "customDomain" ? (
            <div className="relative flex w-full ">
              <input
                {...inputAttrs}
                className="z-10 flex-1 rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
              />
              {inputAttrs.defaultValue && (
                <div className="absolute right-3 z-10 flex h-full items-center">
                  <DomainStatus domain={inputAttrs.defaultValue} />
                </div>
              )}
            </div>
          ) : inputAttrs.type === "json" ? (
            <div className="relative  flex w-full flex-col items-center gap-3">
              <h2 className="mt-12 font-title text-lg">
                Adicionar {`${inputAttrs.placeholder}`}
              </h2>
              <div className="flex w-full flex-col rounded-lg border p-5">
                {inputAttrs?.inputs?.map(
                  (input, iptIdx: number) =>
                    input.type === "file" && (
                      <div
                        key={`key-div-uploader-${iptIdx}`}
                        className="z-10 flex flex-1 items-center justify-center rounded border"
                      >
                        <Uploader
                          key={`key-uploader-${iptIdx}`}
                          defaultValue={input.defaultValue!}
                          name={"image"}
                          fit
                        />
                      </div>
                    ),
                )}
                {inputAttrs?.inputs?.map((input, iptIdx: number) => (
                  <div
                    key={`key-inputs-${iptIdx}`}
                    className="col-span-2 mb-3 flex w-full flex-col"
                  >
                    {input.type === "text" && (
                      <input
                        key={iptIdx}
                        {...input}
                        className="z-10 h-11 flex-1 rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
                      />
                    )}
                    {input.type === "textarea" && (
                      <textarea
                        {...input}
                        rows={4}
                        className="flex-1 rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
                      />
                    )}
                  </div>
                ))}
                {!formButton ? <FormButton /> : null}
              </div>
            </div>
          ) : inputAttrs.name === "description" ||inputAttrs.name === "footerDescription" ||
            inputAttrs.name === "shortDescription" ? (
            <textarea
              {...inputAttrs}
              rows={6}
              className="w-full rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
            />
            
          ) : (
            <input
              {...inputAttrs}
              className="w-full rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
            />
          )}
        </div>
        {inputAttrs.name === "customDomain" && inputAttrs.defaultValue && (
          <DomainConfiguration domain={inputAttrs.defaultValue} />
        )}
        <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 dark:border-stone-700 dark:bg-stone-800">
          {helpText && (
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {helpText}
            </p>
          )}
          {formButton ? <FormButton /> : null}
        </div>
      </div>
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Atualizar</p>}
    </button>
  );
}
