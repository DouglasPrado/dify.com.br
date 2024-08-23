"use client";
import { createContext, useCallback, useState } from "react";

export const AsaasContext = createContext<{
  customer: string | null;
  addCustomer: (id: string) => void;
  selectedPayment: "creditCard" | "pix" | "boleto";
  selectPayment: (payment: "creditCard" | "pix" | "boleto") => void;
  price: number;
  url: string;
}>({
  addCustomer: (id: string) => {},
  customer: null,
  selectedPayment: "creditCard",
  selectPayment: (payment: string) => {},
  price: 0,
  url: "",
});

export const AsaasProvider = ({ price, url, children }: any) => {
  const [customer, setCustomer] = useState<string | null>(null);
  const [payment, setPayment] = useState<"creditCard" | "pix" | "boleto">(
    "creditCard",
  );

  const selectPayment = useCallback(
    (payment: "creditCard" | "pix" | "boleto") => {
      setPayment(payment);
    },
    [],
  );

  const addCustomer = useCallback((id: string) => {
    setCustomer(id);
  }, []);

  return (
    <AsaasContext.Provider
      value={{
        customer,
        addCustomer,
        selectedPayment: payment,
        selectPayment,
        price,
        url,
      }}
    >
      {children}
    </AsaasContext.Provider>
  );
};
