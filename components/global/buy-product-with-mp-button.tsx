"use client";

import Star from "@/public/star.svg";
import { Payment, initMercadoPago } from "@mercadopago/sdk-react";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
export default function BuyProductWithMPButton({
  data,
  colors,
  priceId,
  price,
  section,
  disabled = true,
}: any) {
  const initialization = {
    amount: 100,
  };
  const customization: any = {
    visual: {
      style: {
        customTexts: {
          formTitle: "Comprar agora",
          formSubmit: "Finalizar pagamento",
        },
        customVariables: {
          baseColor: "#22c55e",
        },
      },
    },
    paymentMethods: {
      ticket: "all",
      atm: "all",
      creditCard: "all",
      bankTransfer: "all",
      maxInstallments: 6,
    },
  };
  initMercadoPago("TEST-8cdc3f35-3996-4db0-8d9e-81e909f6e227");
  const onSubmit = async ({ selectedPaymentMethod, formData }: any) => {
    // callback called when clicking the submit data button
    return new Promise((resolve, reject) => {
      fetch("/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          // receive payment result
        })
        .catch((error) => {
          // handle error response when trying to create payment
          reject();
        });
    });
  };
  const onError = async (error: any) => {
    // callback called for all Brick error cases
    console.log(error);
  };
  const onReady = async () => {
    /*
      Callback called when Brick is ready.
      Here you can hide loadings from your site, for example.
    */
  };
  const priceBRLPartials = (price / 100 / 6).toLocaleString("pt-br", {
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
    <div className="flex w-full flex-col items-center justify-center lg:items-start lg:justify-start">
      <div className="flex w-full flex-col items-center py-3 lg:items-start lg:justify-start">
        <div className="flex gap-3">
          <Image src={Star.src} alt="" width={24} height={24} />
          <Image src={Star.src} alt="" width={24} height={24} />
          <Image src={Star.src} alt="" width={24} height={24} />
          <Image src={Star.src} alt="" width={24} height={24} />
          <Image src={Star.src} alt="" width={24} height={24} />
        </div>
        <span className="text-3xl font-bold text-green-500">
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
      <div className="flex flex-col items-center lg:items-start ">
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
        <div className=" flex w-full max-w-xs items-center justify-center gap-1 lg:justify-start">
          <ShieldCheck width={18} />
          <span className="text-sm font-light text-gray-600">6x de</span>
          <strong className=" text-gray-800">{priceBRLPartials}</strong>
          <span className="text-sm font-light text-gray-600">sem juros</span>
        </div>
        <Payment
          initialization={initialization}
          customization={customization}
          onSubmit={onSubmit}
          onReady={onReady}
          onError={onError}
        />
      </div>
    </div>
  );
}
