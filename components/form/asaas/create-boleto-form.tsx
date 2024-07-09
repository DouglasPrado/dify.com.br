"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { createPayment } from "@/lib/actions/asaas/payment";
import { AsaasContext } from "@/lib/contexts/AsaasContext";

import { cn } from "@/lib/utils";
import { Calendar, Clock1, QrCode, Shield } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function CreateBoletoForm() {
  const { id } = useParams() as { id: string };
  const { push } = useRouter();
  const { customer, price, url } = useContext(AsaasContext);
  const [loading, setLoading] = useState(false);
  return (
    <form
      action={async (data: FormData) =>
        createPayment(data).then((res: any) => {
          setLoading(true);
          if (res?.errors) {
            res.errors.map((error: any) => toast.error(error.description));
          } else {
            push(`/checkout/asaas/${url}/boleto/${res.id}`);
            setLoading(false);
          }
        })
      }
    >
      <section className="flex flex-col items-start justify-start gap-3 pb-6">
        <h1 className="font-title text-xl">Gerar boleto</h1>
        <div className="grid grid-cols-3 gap-3">
          {customer && (
            <input
              type="hidden"
              name="customer"
              id="customer"
              value={customer}
            />
          )}
          {price && (
            <input type="hidden" name="value" id="value" value={price} />
          )}
          <input
            type="hidden"
            name="billingType"
            id="billingType"
            value={"BOLETO"}
          />
          <section className="flex flex-col items-start gap-1 rounded-lg border px-2 py-4 shadow-lg">
            <Calendar size={18} />
            <h1 className="text-left font-title text-xs">
              Pague até a data de vencimento
            </h1>
            <p className="text-left text-xs text-slate-700">
              Faça o pagamento até a data de vencimento e garanta seu acesso ao
              produto.
            </p>
          </section>
          <section className="flex flex-col items-start gap-1 rounded-lg border px-2 py-4 shadow-lg">
            <Clock1 size={18} />
            <h1 className="text-left font-title text-xs">
              Aguarde a aprovação do pagamento
            </h1>
            <p className="text-left text-xs text-slate-700">
              Pagamentos com boleto levam <strong>até 3 dias úteis</strong> para
              serem compensados.
            </p>
          </section>
          <section className="flex flex-col items-start gap-1 rounded-lg border px-2 py-4 shadow-lg">
            <QrCode size={18} />
            <h1 className="text-left font-title text-xs">
              Pague com Pix e tenha acesso imediato ao produto
            </h1>
            <p className="text-left text-xs text-slate-700">
              O pagamento leva apenas alguns segundos para ser processado.
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
        pending || loading
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "bg-green-500 text-white hover:bg-green-600 dark:hover:bg-green-700",
      )}
      disabled={pending || loading}
    >
      {pending ? (
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
