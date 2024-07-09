"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { createPayment } from "@/lib/actions/asaas/payment";
import { AsaasContext } from "@/lib/contexts/AsaasContext";
import { cn } from "@/lib/utils";
import { Clock1, QrCode, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function CreatePixForm() {
  const { customer, price, url } = useContext(AsaasContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <form
      action={async (data: FormData) =>
        createPayment(data).then((res: any) => {
          console.log(res);
          if (res?.errors) {
            res.errors.map((error: any) => toast.error(error.description));
          } else {
            router.push(`/checkout/asaas/${url}/pix/${res.id}`);
          }
        })
      }
    >
      <section className="flex flex-col items-start justify-start gap-3 pb-6">
        <h1 className="font-title text-xl">Gerar código PIX</h1>
        {customer && (
          <input type="hidden" name="customer" id="customer" value={customer} />
        )}
        {price && <input type="hidden" name="value" id="value" value={price} />}
        <input
          type="hidden"
          name="billingType"
          id="billingType"
          value={"PIX"}
        />
        <div className="grid grid-cols-3 gap-3">
          <section className="flex flex-col items-start gap-1 rounded-lg border px-2 py-4 shadow-lg">
            <Clock1 size={18} />
            <h1 className="text-left font-title text-xs">Aprovação imediata</h1>
            <p className="text-left text-xs text-slate-700">
              O pagamento com Pix leva pouco tempo para ser processado.
            </p>
          </section>
          <section className="flex flex-col items-start gap-1 rounded-lg border px-2 py-4 shadow-lg">
            <Shield size={18} />
            <h1 className="text-left font-title text-xs">Transação segura</h1>
            <p className="text-left text-xs text-slate-700">
              O PIX foi desenvolvido para facilitar suas compras, garantindo a
              proteção dos seus dados
            </p>
          </section>
          <section className="flex flex-col items-start gap-1 rounded-lg border px-2 py-4 shadow-lg">
            <QrCode size={18} />
            <h1 className="text-left font-title text-xs">
              Finalize sua compra com facilidade
            </h1>
            <p className="text-left text-xs text-slate-700">
              É só acessar a área PIX no aplicativo do seu banco e escanear o QR
              code ou digitar o código
            </p>
          </section>
        </div>
      </section>
      <FormButton loading={loading} />
    </form>
  );
}

function FormButton({ loading }: { loading: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-12 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-12",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "bg-green-500 text-white hover:bg-green-600 dark:hover:bg-green-700",
      )}
      disabled={pending || loading}
    >
      {pending || loading ? (
        <LoadingDots color="#808080" />
      ) : (
        <p className="flex items-center justify-between gap-3 font-title text-sm uppercase">
          <Shield size={20} />
          Comprar agora
        </p>
      )}
    </button>
  );
}
