"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import CopyButton from "../global/copy-button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function GetQRCode({ data }: any) {
  let url = data.site.customDomain
    ? `${data.site.customDomain}/link/${data.url}`
    : `${data.site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/link/${data.url}`;
  return (
    <>
      <form></form>
      <div className="w-full rounded-md bg-white md:max-w-md md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700">
        <div className="relative flex flex-col items-center space-y-4 p-5 md:p-6">
          <Avatar className="h-12 w-12">
            <AvatarImage src="" />
            <AvatarFallback className="from bg-gradient-to-tr from-[#FF95C8] to-[#F7FF7C] font-semibold text-black" />
          </Avatar>
          <h2 className="font-title text-2xl dark:text-white">
            Download QR Code
          </h2>
        </div>
        <div className="flex w-full items-center justify-center  border-t border-stone-200 bg-stone-50 p-3 md:px-10 dark:border-stone-700 dark:bg-stone-800">
          <Image
            src={data.qrCode}
            alt="qr"
            height={164}
            width={164}
            className="rounded-lg border"
          />
        </div>
        <div className="flex  items-center justify-end gap-5 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 md:px-10 dark:border-stone-700 dark:bg-stone-800">
          <CopyButton
            string={url}
            className={cn(
              "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
              "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
            )}
          />
          <Link
            href={data.qrCode}
            download
            target="_blank"
            className={cn(
              "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
              "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
            )}
          >
            Download
          </Link>
        </div>
      </div>
    </>
  );
}
