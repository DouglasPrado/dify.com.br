"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import BuyProductButton from "../global/buy-product-with-stripe-button";
export default function CreateLeadModal({
  dataSet,
  colors,
  price,
  section,
}: any) {
  const params = useSearchParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    utm_source: params.get("utm_source"),
    utm_campaign: params.get("utm_campaign"),
    utm_medium: params.get("utm_medium"),
    productId: dataSet.productId,
  });
  const checkButtonBuy = !(
    data.name !== "" &&
    data.email !== "" &&
    data.phoneNumber !== ""
  );

  return (
    <div className="w-full rounded-md bg-white md:max-w-md md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700">
      <div className="relative flex flex-col space-y-4 p-5 ">
        <h2 className="font-title text-2xl dark:text-white">
          Antes de continuar para o carrinho...
        </h2>
        <p className="text-left text-sm font-light text-stone-500 dark:text-stone-400">
          🛒 Quase lá! Antes de finalizar sua compra e garantir os produtos
          incríveis que você escolheu, precisamos de algumas informações
          rápidas.
        </p>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Nome completo
          </label>

          <input
            name="name"
            type="text"
            placeholder="Digite o nome completo"
            autoFocus
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            maxLength={155}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            E-mail
          </label>
          <input
            name="email"
            type="text"
            placeholder="Ex: douglasprado@gmail.com"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            maxLength={155}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Whatsapp
          </label>

          <input
            name="whatsapp"
            type="tel"
            placeholder="Ex: (11) 99739-9951"
            value={data.phoneNumber}
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
            maxLength={16}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>
        <p className="text-center text-sm font-light text-stone-500 dark:text-stone-400">
          Fique tranquilo(a), seus dados estão seguros conosco. <br /> Agora,
          clique em Continuar para o Carrinho para concluir sua compra e
          aproveitar sua compra! 🚀 Obrigado por escolher a gente! 🛍️
        </p>
      </div>

      <div className="flex w-full items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800">
        <BuyProductButton
          data={{ ...dataSet, ...data }}
          colors={colors}
          price={price}
          section={section}
          disabled={checkButtonBuy}
        />
      </div>
    </div>
  );
}
