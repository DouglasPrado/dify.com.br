"use client";

import { AsaasContext } from "@/lib/contexts/AsaasContext";
import { cn } from "@/lib/utils";
import { Barcode, CreditCard, QrCode } from "lucide-react";
import { useContext } from "react";
import CreateBoletoForm from "./create-boleto-form";
import CreateCreditCardForm from "./create-credit-card-form";
import CreatePixForm from "./create-pix-form";

export default function SelectMethodPaymentButton() {
  const { customer, selectPayment, selectedPayment } = useContext(AsaasContext);
  return (
    <div className="flex w-full flex-col gap-6 lg:max-w-lg">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4">
        <button
          onClick={() => !!customer && selectPayment("pix")}
          className={cn(
            customer && selectedPayment === "pix"
              ? "border-stone-900 text-stone-900 "
              : "border-stone-400 text-stone-400 ",
            "flex w-full flex-col items-start justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-left text-xs font-medium transition-all hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
            !customer
              ? "cursor-not-allowed  hover:bg-stone-100 hover:text-stone-400"
              : "",
          )}
        >
          <QrCode />
          Pix
        </button>
        <button
          onClick={() => !!customer && selectPayment("creditCard")}
          className={cn(
            customer && selectedPayment === "creditCard"
              ? "border-stone-900 text-stone-900 "
              : "border-stone-400 text-stone-400 ",
            "flex w-full flex-col items-start justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-left text-xs font-medium transition-all hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
            !customer
              ? "cursor-not-allowed  hover:bg-stone-100 hover:text-stone-400"
              : "",
          )}
        >
          <CreditCard />
          Cartão de crédito
        </button>
        <button
          onClick={() => !!customer && selectPayment("boleto")}
          className={cn(
            customer && selectedPayment === "boleto"
              ? "border-stone-900 text-stone-900 "
              : "border-stone-400 text-stone-400 ",
            "flex w-full flex-col items-start justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-xs font-medium transition-all hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
            !customer
              ? "cursor-not-allowed  hover:bg-stone-100 hover:text-stone-400"
              : "",
          )}
        >
          <Barcode />
          Boleto
        </button>
      </div>
      {selectedPayment === "creditCard" && <CreateCreditCardForm />}
      {selectedPayment === "boleto" && <CreateBoletoForm />}
      {selectedPayment === "pix" && <CreatePixForm />}
    </div>
  );
}
