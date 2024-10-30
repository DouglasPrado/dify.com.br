"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { cn, getStripe } from "@/lib/utils";
import { Product } from "@prisma/client";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
export default function BuyProductWithStripeButton({
  data,
  colors,
  priceId,
  price,
  section,
  disabled = true,
}: any) {
  const [isPending, startTransition] = useTransition();

  const handleCreateCheckoutSession = async (product: Product) => {
    const res = await fetch(`/api/checkout`, {
      method: "POST",
      body: JSON.stringify({
        id: product.id,
        slug: product.url,
        priceId,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        utm_source: data.utm_source,
        utm_campaign: data.utm_campaign,
        utm_medium: data.utm_medium,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const checkoutSession = await res.json().then((value) => {
      return value.session;
    });

    const stripe = await getStripe();
    await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
  };

  const priceBRL = (price / 100).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  const priceBRLWithPix = ((price / 100) * 0.9).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <button
        onClick={() =>
          !disabled &&
          startTransition(async () => {
            await handleCreateCheckoutSession(data);
          })
        }
        style={{
          backgroundColor: !disabled
            ? colors.primary
            : "rgb(120 113 108 / var(--tw-bg-opacity))",
          color: colors.primaryContrast,
        }}
        className={cn(
          `w-full max-w-sm rounded-lg  py-4 font-title text-lg  shadow-lg hover:bg-opacity-90`,
          disabled ? "cursor-not-allowed bg-stone-200" : "bg-black",
          isPending
            ? "cursor-not-allowed border-stone-200 bg-stone-500 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            : " text-white hover:bg-white  hover:text-black active:bg-stone-100 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
        )}
        disabled={isPending}
      >
        {isPending ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>Continuar para o Carrinho</p>
        )}
      </button>
      <div className="flex flex-col items-center ">
        <div className="mt-3 flex w-full items-center justify-center gap-3 lg:max-w-xs">
          <ShieldCheck width={18} />
          <span className="text-xs font-light text-gray-600">
            1x sem juros {priceBRL}
          </span>
          <strong className="text-xl text-gray-800">{priceBRL}</strong>
        </div>
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
        <span className="text-xs font-semibold text-gray-600">
          10% de desconto no pix {priceBRLWithPix}
        </span>
      </div>
    </div>
  );
}
