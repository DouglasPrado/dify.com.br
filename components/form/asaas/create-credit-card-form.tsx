"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { createPayment } from "@/lib/actions/asaas/payment";
import { AsaasContext } from "@/lib/contexts/AsaasContext";
import { cn, getCardType } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import valid from "card-validator";
import { AlertOctagon, Shield } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const normalizeCardNumber = (value: string) => {
  return (
    value
      .replace(/\D+/g, "")
      .match(/.{1,4}/g)
      ?.join(" ")
      .substr(0, 19) || ""
  );
};

const normalizeDate = (value: string) => {
  return (
    value
      .replace(/\D+/g, "")
      .replace(/(\d{2})(\d)/, "$1 / $2")
      .substring(0, 9) || ""
  );
};
const schema = z.object({
  holderName: z
    .string()
    .min(3, "Digite o nome completo")
    .max(175, "O nome é muito grande."),
  number: z.string().email("Número inválido"),
  installmentCount: z.string().email("Email inválido"),
  date: z.string().min(14, "Data Inválida").max(14, "Data Inválida"),
  ccv: z.string().min(3, "CVV inválido").max(4, "CVV inválido"),
});

export default function CreateCreditCardForm() {
  const { id } = useParams() as { id: string };
  const { customer, price, url } = useContext(AsaasContext);
  const [loading, setLoading] = useState(false);

  const [flag, setFlag] = useState(null as string | null);
  const { push } = useRouter();
  type SchemaType = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SchemaType>({ resolver: zodResolver(schema), mode: "onChange" });

  return (
    <form
      action={async (data: FormData) =>
        createPayment(data).then((res: any) => {
          setLoading(true);
          if (res?.errors) {
            res.errors.map((error: any) => toast.error(error.description));
          } else {
            res.id &&
              push(`/checkout/asaas/${url}/credit-card/${res.id}/success`);
            res.id && setLoading(false);
          }
        })
      }
    >
      <section className="flex flex-col items-start justify-start gap-3 pb-6">
        <h1 className="font-title text-xl">Cartão de crédito</h1>
        {customer && (
          <input type="hidden" name="customer" id="customer" value={customer} />
        )}
        {price && <input type="hidden" name="value" id="value" value={price} />}
        <input
          type="hidden"
          name="billingType"
          id="billingType"
          value={"CREDIT_CARD"}
        />
        <div className="mt-3 flex w-full  flex-col">
          <label
            htmlFor="number"
            className="text-left text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Número do cartão
          </label>
          <div className="relative flex flex-col items-end justify-center">
            <input
              {...register("number")}
              name="number"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="0000 0000 0000 0000"
              required
              disabled={!customer}
              onChange={(event) => {
                const { value } = event.target;
                event.target.value = normalizeCardNumber(value);
                try {
                  z.string()
                    .trim()
                    .refine((value) => valid.number(value).isValid, {
                      message: "CPF Invalido",
                    })
                    .parse(event.target.value);
                  const getType = getCardType(event.target.value);
                  setFlag(getType);
                  clearErrors();
                  return event.target.value;
                } catch (error) {
                  setError("number", { message: "Número inválido" });
                }
              }}
              className={cn(
                errors.number?.message
                  ? "focus:border-rose-500 focus:ring-rose-500"
                  : "focus:border-black focus:ring-black",
                "w-full rounded-t-md border border-b-0 border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-b  focus:outline-none  dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
                !customer
                  ? "cursor-not-allowed border-stone-400  text-stone-600"
                  : "",
              )}
            />
            {errors.number && (
              <span className=" absolute mr-3 text-left text-xs text-rose-500">
                <AlertOctagon />
              </span>
            )}
          </div>

          <div className="flex">
            <div className="flex w-full flex-col items-end justify-center">
              <input
                {...register("date")}
                name="date"
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="MM / YY"
                maxLength={16}
                required
                onChange={async (event: any) => {
                  const { value } = event.target;
                  event.target.value = normalizeDate(value);
                  try {
                    z.string()
                      .min(9, "Data Inválida")
                      .max(9, "Data Inválida")
                      .trim()
                      .refine((value) => {
                        const splitDate = value.split(" / ");
                        const now = new Date();

                        if (
                          +splitDate[1] >= +now.getFullYear() &&
                          +splitDate[1] <= 2050 &&
                          +splitDate[0] >= now.getMonth() &&
                          +splitDate[0] >= 1 &&
                          +splitDate[0] <= 12
                        ) {
                          return true;
                        }

                        return false;
                      })
                      .parse(event.target.value);
                    clearErrors();
                    return event.target.value;
                  } catch (error) {
                    setError("date", { message: "Telefone inválido" });
                  }
                }}
                disabled={!customer}
                className={cn(
                  errors.date?.message
                    ? "focus:border-rose-500 focus:ring-rose-500"
                    : "focus:border-black focus:ring-black",
                  "w-full rounded-bl-md border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-b  focus:outline-none  dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
                  !customer
                    ? "cursor-not-allowed border-stone-400  text-stone-700"
                    : "",
                )}
              />
              {errors.date && (
                <span className="absolute mr-3 text-left text-xs text-rose-500">
                  <AlertOctagon />
                </span>
              )}
            </div>
            <div className="flex w-full flex-col items-end justify-center">
              <input
                {...register("ccv")}
                name="ccv"
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="CVV"
                maxLength={4}
                required
                disabled={!customer}
                className={cn(
                  errors.ccv?.message
                    ? "focus:border-rose-500 focus:ring-rose-500"
                    : "focus:border-black focus:ring-black",
                  "w-full rounded-br-md border border-l-0 border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-b  focus:outline-none  dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
                  !customer
                    ? "cursor-not-allowed border-stone-400  text-stone-700"
                    : "",
                )}
              />
              {errors.ccv && (
                <span className="absolute mr-3 text-left text-xs text-rose-500">
                  <AlertOctagon />
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col space-y-1">
          <label
            htmlFor="holderName"
            className="text-left text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Nome como no cartão
          </label>

          <input
            {...register("holderName")}
            name="holderName"
            type="text"
            placeholder="Ex: Douglas R Prado"
            maxLength={16}
            required
            disabled={!customer}
            className={cn(
              errors.holderName?.message
                ? "focus:border-rose-500 focus:ring-rose-500"
                : "focus:border-black focus:ring-black",
              " w-full rounded-md border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
              !customer
                ? "cursor-not-allowed border-stone-400  text-stone-700"
                : "",
            )}
          />
          {errors.holderName && (
            <span className="text-left text-xs text-rose-500">
              {errors.holderName.message}
            </span>
          )}
        </div>

        <div className="flex w-full  flex-col space-y-1">
          <label
            htmlFor="installmentCount"
            className="text-left text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Selecione o número de parcelas
          </label>
          <select
            {...register("installmentCount")}
            name="installmentCount"
            disabled={!customer}
            className={cn(
              " w-full rounded-md border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
              !customer
                ? "cursor-not-allowed border-stone-400  text-stone-700"
                : "",
            )}
          >
            <option value="1">1x de R$ 53,79 (sem juros)</option>
            <option value="2">2x de R$ 48,74</option>
            <option value="3">3x de R$ 38,95</option>
            <option value="4">4x de R$ 33,39</option>
            <option value="5">5x de R$ 28,19</option>
            <option value="6">6x de R$ 25,95</option>
          </select>
        </div>
      </section>
      <FormButton />
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-12 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-12",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "bg-green-500 text-white hover:bg-green-600 dark:hover:bg-green-700",
      )}
      disabled={pending}
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
