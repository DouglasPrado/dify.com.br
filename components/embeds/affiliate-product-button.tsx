"use client";

import { cn } from "@/lib/utils";
import { CheckCheck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingDots from "../icons/loading-dots";
const METHOD_PAYMENT = false;

export default function AffiliateProductButton({
  url,
  price,
  showPrice = false,
  showBannerSecurity = false,
  source = "amazon",
  size = "sm",
}: {
  url: any;
  price: number;
  showPrice?: boolean;
  showBannerSecurity?: boolean;
  source: string;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const priceBRLPartials = (price / 100 / 12).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const priceOldBRL = (price / 100 / 0.7).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const priceBRL = (price / 100).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  const priceBRLWithPix = ((price / 100) * 0.9).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  return (
    <div className="flex w-full flex-col items-center justify-center lg:max-w-xs">
      <div className="flex w-full flex-col items-center ">
        {showPrice && (
          <>
            <div className="flex items-center gap-2 ">
              <span className="font-semibold text-slate-700 line-through">
                {priceOldBRL}
              </span>
              <span className="text-2xl font-black">{priceBRL}</span>
            </div>

            <span className="text-3xl font-bold text-green-500">
              {priceBRLWithPix} no pix
            </span>
            <span className="animate-pulse text-center text-sm text-green-500">
              Você está economizando{" "}
              <strong className="font-title">
                {(price / 100 / 0.7 - price / 100).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </strong>
              comprando agora!
            </span>
          </>
        )}
      </div>
      <button
        className={cn(
          loading
            ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            : "${} bg-slate-900 text-white hover:bg-white hover:text-slate-600 dark:hover:bg-transparent",
          `flex ${size === "lg" && "uppercase"} ${
            size === "xs"
              ? "px-4"
              : size === "sm"
              ? "w-full sm:w-auto sm:px-6 "
              : size === "md"
              ? "px-8"
              : size === "lg"
              ? "w-full"
              : ""
          }  items-center justify-center gap-3 rounded-lg py-${
            size === "xs"
              ? "0.5"
              : size === "sm"
              ? "2"
              : size === "md"
              ? "2"
              : size === "lg"
              ? "4"
              : "0"
          } text-${size} shadow-${size} hover:bg-opacity-90`,
          " bg-green-500 text-white hover:bg-green-600/80 hover:text-white active:bg-green-600/70 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
        )}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <>
            <CheckCheck
              size={
                size === "sm" ? 16 : size === "md" ? 20 : size === "lg" ? 22 : 0
              }
            />
            Ir para {source}
          </>
        )}
      </button>
      {METHOD_PAYMENT && (
        <div className="flex w-full flex-col items-center">
          <div className="flex gap-3">
            <Image
              src={`/mastercard.svg`}
              width={28}
              height={28}
              alt="[MasterCard]"
            />
            <Image src={`/visa.svg`} width={28} height={28} alt="[Visa]" />
            <Image
              src={`/gpay.svg`}
              width={42}
              height={42}
              alt="[Google Pay]"
            />
            <Image
              src={`/applepay.svg`}
              width={42}
              height={42}
              alt="[Apple Pay]"
            />
            <Image src={`/pix.svg`} width={42} height={42} alt="[Pix]" />
          </div>
        </div>
      )}
      {showPrice && (
        <div className=" flex w-full max-w-xs items-center justify-center gap-1 bg-white py-3">
          <ShieldCheck width={18} />
          <span className="text-sm font-light text-gray-600">12x de</span>
          <strong className=" text-gray-800">{priceBRLPartials}</strong>
          <span className="text-sm font-light text-gray-600">sem juros</span>
        </div>
      )}
      {showBannerSecurity && (
        <div className="">
          <Image
            src={`/compra-segura.png`}
            width={340}
            height={28}
            alt="[MasterCard]"
          />
        </div>
      )}
    </div>
  );
}
