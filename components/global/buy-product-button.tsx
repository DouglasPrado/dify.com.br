"use client";

import { cn } from "@/lib/utils";
import { CheckCheck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingDots from "../icons/loading-dots";
const METHOD_PAYMENT = false;

export default function BuyProductButton({
  data,
  price,
  colors,
  section,
}: {
  data: any;
  price: number;
  colors?: any;
  section?: string;
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
      <div className="flex w-full flex-col items-center py-3">
        {/* <div className="flex gap-3">
          <Image src={Star.src} alt="" width={24} height={24} />
          <Image src={Star.src} alt="" width={24} height={24} />
          <Image src={Star.src} alt="" width={24} height={24} />
          <Image src={Star.src} alt="" width={24} height={24} />
          <Image src={Star.src} alt="" width={24} height={24} />
        </div> */}

        <div className="flex items-center gap-2 ">
          <span className="font-semibold">ou</span>
          <span className="font-semibold text-stone-700 line-through">
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
            })}{" "}
          </strong>
          comprando agora!
        </span>
      </div>
      <button
        onClick={() => {
          setLoading(true);
          push(`/checkout/asaas/${data.url}`);
          setLoading(false);
        }}
        className={cn(
          loading
            ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            : "bg-stone-900 text-white hover:bg-white hover:text-stone-600 dark:hover:bg-transparent",
          `flex w-full items-center justify-center gap-3 rounded-lg py-4 font-title text-lg shadow-lg hover:bg-opacity-90 lg:max-w-xs`,
          " bg-green-500 uppercase text-white active:bg-stone-100 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
        )}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <>
            <CheckCheck />
            Comprar agora
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
      <div className=" flex w-full max-w-xs items-center justify-center gap-1 bg-white py-3">
        <ShieldCheck width={18} />
        <span className="text-sm font-light text-gray-600">12x de</span>
        <strong className=" text-gray-800">{priceBRLPartials}</strong>
        <span className="text-sm font-light text-gray-600">sem juros</span>
      </div>
      <div className="py-6">
        <Image
          src={`/compra-segura.png`}
          width={340}
          height={28}
          alt="[MasterCard]"
        />
      </div>
    </div>
  );
}
