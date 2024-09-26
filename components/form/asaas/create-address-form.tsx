"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { updateCustomer } from "@/lib/actions/asaas/customers";
import { AsaasContext } from "@/lib/contexts/AsaasContext";
import { cn, fetcher } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useCallback, useContext, useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
export default function CreateAddressForm() {
  const { customer } = useContext(AsaasContext);
  const [isOpen, setIsOpen] = useState(false);
  const [getCEP, setGetCEP] = useState<any>(null);
  const [nextStep, setNextStep] = useState<boolean>(false);
  const schema = z.object({
    postalCode: z.string().min(9, "CEP Inválido").max(9, "CEP Inválido"),
  });

  type SchemaType = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SchemaType>({ resolver: zodResolver(schema), mode: "onChange" });

  const variants = {
    open: {
      opacity: 1,
      x: 0,
      display: "block",
      transition: {
        delay: 0.3,
      },
    },
    closed: { opacity: 0, y: "-100%", display: "none" },
  };
  const handleCEP = useCallback((value: any) => {
    if (value.length === 9) {
      fetcher(`https://brasilapi.com.br/api/cep/v2/${value}`).then((data) => {
        setGetCEP(data);
        setIsOpen(true);
      });
    }
  }, []);

  return (
    <form
      action={async (data: FormData) => {
        customer &&
          updateCustomer(customer, data).then((res: any) => {
            if (res?.error) {
              toast.error(res.error);
            } else {
              setNextStep(true);
              toast.success(`Informações de endereço criada com sucesso!`);
            }
          });
      }}
      className="flex w-full flex-col lg:max-w-lg"
    >
      <section className="flex w-full flex-col items-start justify-start gap-3 pb-3">
        <h1 className="font-title text-xl">Informe endereço de entrega</h1>
        <div className=" flex w-full flex-col space-y-1">
          <label
            htmlFor="postalCode"
            className="text-left text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            CEP
          </label>

          <input
            name="postalCode"
            type="text"
            placeholder="Ex: 00000-000"
            maxLength={9}
            required
            onChange={(e) => {
              try {
                e.target.value = normalizeCEPNumber(e.target.value);
                z.string()
                  .min(9, "CEP inválido")
                  .max(9, "CEP inválido")
                  .parse(e.target.value);
                handleCEP(e.target.value);
                clearErrors();
                return e.target.value;
              } catch (error) {
                setError("postalCode", { message: "CEP inválido" });
              }
            }}
            className={cn(
              " w-full rounded-md border border-stone-200 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
              !!customer && nextStep
                ? "cursor-not-allowed border-stone-400 bg-stone-100 text-stone-700"
                : "",
              errors.postalCode?.message
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                : watch("postalCode")
                ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500"
                : "",
            )}
          />
          {errors.postalCode && (
            <span className="text-left text-xs text-rose-500">
              {errors.postalCode.message}
            </span>
          )}
        </div>
        <motion.div
          animate={isOpen && customer && !nextStep ? "open" : "closed"}
          variants={variants}
          className="flex w-full"
        >
          <motion.ul
            variants={{
              open: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 },
              },
              closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 },
              },
            }}
            className="flex w-full flex-col gap-2"
          >
            <div className="flex w-full flex-col items-start justify-start space-y-1">
              <label
                htmlFor="address"
                className="text-left text-sm font-medium text-stone-500 dark:text-stone-400"
              >
                Endereço
              </label>

              <input
                name="address"
                type="text"
                placeholder="Ex: Rua Idano de Oliveira"
                maxLength={175}
                defaultValue={getCEP?.street}
                required
                className={cn(
                  " w-full rounded-md border border-stone-200 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
                )}
              />
            </div>

            <div className="flex w-full flex-col items-start justify-start space-y-1">
              <label
                htmlFor="addressNumber"
                className="text-left text-sm font-medium text-stone-500 dark:text-stone-400"
              >
                Nº
              </label>

              <input
                name="addressNumber"
                type="tel"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="Ex Nº: 142"
                maxLength={175}
                required
                className={cn(
                  " w-full rounded-md border border-stone-200 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
                )}
              />
            </div>

            <div className="flex w-full flex-col items-start justify-start space-y-1">
              <label
                htmlFor="address"
                className="text-left text-sm font-medium text-stone-500 dark:text-stone-400"
              >
                Complemento (opcional)
              </label>

              <input
                name="complement"
                type="text"
                placeholder="Ex: apto 2, Bloco 2"
                maxLength={175}
                className={cn(
                  " w-full rounded-md border border-stone-200 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
                )}
              />
            </div>

            <div className="flex w-full flex-col  space-y-1">
              <label
                htmlFor="province"
                className="text-left text-sm font-medium text-stone-500 dark:text-stone-400"
              >
                Bairro
              </label>

              <input
                name="province"
                type="text"
                placeholder="Bairro"
                defaultValue={getCEP?.neighborhood}
                maxLength={13}
                required
                className={cn(
                  " w-full rounded-md border border-stone-200 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              <div className="flex w-full flex-col space-y-1">
                <label
                  htmlFor="city"
                  className="text-left text-sm font-medium text-stone-500 dark:text-stone-400"
                >
                  Cidade
                </label>

                <input
                  name="city"
                  type="text"
                  placeholder="Ex: São Paulo"
                  maxLength={15}
                  required
                  defaultValue={getCEP?.city}
                  className={cn(
                    " w-full rounded-md border border-stone-200 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
                  )}
                />
              </div>
              <div className="flex w-full flex-col space-y-1">
                <label
                  htmlFor="state"
                  className="text-left text-sm font-medium text-stone-500 dark:text-stone-400"
                >
                  Estado
                </label>

                <input
                  name="state"
                  type="text"
                  placeholder="Ex: São Paulo"
                  maxLength={15}
                  required
                  defaultValue={getCEP?.state}
                  className={cn(
                    " w-full rounded-md border border-stone-200 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
                  )}
                />
              </div>
            </div>
          </motion.ul>
        </motion.div>
      </section>
      {!nextStep ? (
        <FormButton nextStep={nextStep} />
      ) : (
        <p className="text-left text-xs text-emerald-500">
          Agora preencha as informações de pagamento para completar sua compra!
        </p>
      )}
    </form>
  );
}

function FormButton({ nextStep }: { nextStep: boolean }) {
  const { customer } = useContext(AsaasContext);
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(
        "flex h-12 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
        pending && !customer && !nextStep
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "bg-stone-900 text-white hover:bg-white hover:text-stone-600 dark:hover:bg-transparent",
      )}
      disabled={pending && !customer && !nextStep}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Próxima etapa</p>}
    </button>
  );
}

const normalizeCEPNumber = (value: string) => {
  return (
    value
      .replace(/\D+/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 9) || ""
  );
};
