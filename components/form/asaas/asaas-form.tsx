"use client";

import SelectMethodPaymentButton from "@/components/form/asaas/select-method-payment-button";
import { AsaasProvider } from "@/lib/contexts/AsaasContext";
import CreateAddressForm from "./create-address-form";
import CreateCustomerForm from "./create-customer-form";

export default function AsaasForm({ product }: any) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 ">
     
      <AsaasProvider price={product.price / 100} url={product.url}>
        <CreateCustomerForm />
        <CreateAddressForm />
        <SelectMethodPaymentButton />
      </AsaasProvider>

      <p className="text-xs text-gray-400 lg:px-12">
        Seus dados pessoais serão usados ​​para processar seu pedido, apoiar sua
        experiência em todo este site e para outros fins descritos em nossa
        política de privacidade.
      </p>
    </div>
  );
}
