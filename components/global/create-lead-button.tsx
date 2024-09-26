"use client";

import { useModal } from "@/components/modal/provider";
import { cn } from "@/lib/utils";
import Star from "@/public/star.svg";
import { CheckCheck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
export default function CreateLeadButton({
  children,
  price,
  colors,
  section,
}: {
  children: ReactNode;
  price: number;
  colors: any;
  section: string;
}) {
  const modal = useModal();

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
        <div className="flex gap-3">
          <Image src={Star.src} alt="" width={24} height={24} />
          <Image src={Star.src} alt="" width={24} height={24} />
          <Image src={Star.src} alt="" width={24} height={24} />
          <Image src={Star.src} alt="" width={24} height={24} />
          <Image src={Star.src} alt="" width={24} height={24} />
        </div>
        <span className="text-3xl font-bold text-emerald-500">
          {priceBRLWithPix} no pix
        </span>
        <div className="flex items-center gap-2 ">
          <span className="font-semibold">ou</span>
          <span className="font-semibold text-stone-700 line-through">
            {priceOldBRL}
          </span>
          <span className="text-2xl font-black">{priceBRL}</span>
        </div>
      </div>
      <button
        onClick={() => {
          modal?.show(children);
        }}
        className={cn(
          `flex w-full items-center justify-center gap-3 rounded-lg py-4 font-title text-lg shadow-lg hover:bg-opacity-90 lg:max-w-xs`,
          " bg-emerald-500 text-white  active:bg-stone-100 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
        )}
      >
        <CheckCheck />
        Eu quero comprar
      </button>
      <div className="mt-3 flex w-full flex-col items-center">
        <div className="flex gap-3">
          <Image
            src={`/mastercard.svg`}
            width={28}
            height={28}
            alt="[MasterCard]"
          />
          <Image src={`/visa.svg`} width={28} height={28} alt="[Visa]" />
          <Image src={`/gpay.svg`} width={42} height={42} alt="[Google Pay]" />
          <Image
            src={`/applepay.svg`}
            width={42}
            height={42}
            alt="[Apple Pay]"
          />
          <Image src={`/pix.svg`} width={42} height={42} alt="[Pix]" />
        </div>
      </div>
      <div className=" flex w-full max-w-xs items-center justify-center gap-1">
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
