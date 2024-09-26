"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { createCustomer } from "@/lib/actions/asaas/customers";
import { AsaasContext } from "@/lib/contexts/AsaasContext";
import { validateCPF } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function CreateCustomerForm() {
  const schema = z.object({
    name: z
      .string()
      .min(3, "Digite o nome completo")
      .max(175, "O nome é muito grande."),
    email: z.string().email("Email inválido"),
    cpfCnpj: z.string().min(14, "CPF inválido").max(14, "CPF inválido"),
    mobilePhone: z
      .string()
      .min(15, "Telefone inválido")
      .max(15, "Telefone inválido"),
  });
  const { customer, addCustomer } = useContext(AsaasContext);
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    const email = watch("email");
    if (email) {
      setIsOpen(true);
    }
  }, [watch, errors]);
  return (
    <form
      action={async (data: FormData) => {
        createCustomer(data).then((res: any) => {
          if (res?.error) {
            toast.error(res.error);
          } else {
            addCustomer(res.id);
            toast.success(`Informações do comprador criada com sucesso`);
          }
        });
      }}
      className="flex w-full flex-col lg:max-w-lg"
    >
      <section className="flex w-full flex-col items-start justify-start gap-3 pb-6">
        <h1 className="font-title text-xl">Informe seus dados</h1>
        <div className="mt-3 flex w-full flex-col space-y-1">
          <label
            htmlFor="email"
            className="text-left text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            E-mail
          </label>

          <input
            {...register("email")}
            type="email"
            placeholder="Ex: seunome@email.com"
            maxLength={175}
            required
            inputMode="email"
            disabled={!!customer}
            className={cn(
              " w-full rounded-md border border-stone-200 px-4 py-2 text-sm lowercase text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
              !!customer
                ? "cursor-not-allowed border-stone-400 bg-stone-100 text-stone-700"
                : "",
              errors.email?.message
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                : watch("email")
                ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500"
                : "",
            )}
          />
          {errors.email && (
            <span className="text-left text-xs text-rose-500">
              {errors.email.message}
            </span>
          )}
        </div>
        <motion.div
          animate={isOpen && !customer ? "open" : "closed"}
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
                htmlFor="name"
                className="text-left text-sm font-medium text-stone-500 dark:text-stone-400"
              >
                Nome Completo
              </label>

              <input
                {...register("name")}
                type="text"
                placeholder="Ex: Douglas Prado"
                maxLength={175}
                required
                disabled={!!customer}
                className={cn(
                  " w-full rounded-md border border-stone-200 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
                  !!customer
                    ? "cursor-not-allowed border-stone-400 bg-gray-100 text-stone-700"
                    : "",
                  errors.name?.message
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                    : watch("name")
                    ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500"
                    : "",
                )}
              />
              {errors.name && (
                <span className="text-left text-xs text-rose-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex w-full flex-col  space-y-1">
              <label
                htmlFor="documentNumber"
                className="text-left text-sm font-medium text-stone-500 dark:text-stone-400"
              >
                CPF/CNPJ
              </label>

              <input
                {...register("cpfCnpj")}
                name="cpfCnpj"
                type="tel"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="000.000.000-00"
                maxLength={14}
                onChange={async (event: any) => {
                  const { value } = event.target;
                  event.target.value = normalizeCPFNumber(value);
                  try {
                    z.string()
                      .refine(
                        () =>
                          event.target.value !== "000.000.000-00" &&
                          event.target.value !== "111.111.111-11" &&
                          event.target.value !== "222.222.222-22" &&
                          event.target.value !== "333.333.333-33" &&
                          event.target.value !== "444.444.444-44" &&
                          event.target.value !== "555.555.555-55" &&
                          event.target.value !== "666.666.666-66" &&
                          event.target.value !== "777.777.777-77" &&
                          event.target.value !== "888.888.888-88" &&
                          event.target.value !== "999.999.999-99" &&
                          validateCPF(event.target.value) &&
                          event.target.value.match(
                            /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
                          ),
                        {
                          message: "CPF Invalido",
                        },
                      )
                      .parse(event.target.value);
                    clearErrors();
                    return event.target.value;
                  } catch (error) {
                    setError("cpfCnpj", { message: "CPF inválido" });
                  }
                }}
                disabled={!!customer}
                required
                className={cn(
                  " w-full rounded-md border border-stone-200 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
                  !!customer
                    ? "cursor-not-allowed border-stone-400 bg-stone-100 text-stone-700"
                    : "",
                  errors.cpfCnpj?.message
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                    : watch("cpfCnpj")
                    ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500"
                    : "",
                )}
              />
              {errors.cpfCnpj && (
                <span className="text-left text-xs text-rose-500">
                  {errors.cpfCnpj.message}
                </span>
              )}
            </div>
            <div className="flex w-full flex-col space-y-1">
              <label
                htmlFor="whatsapp"
                className="text-left text-sm font-medium text-stone-500 dark:text-stone-400"
              >
                Whatsapp
              </label>

              <input
                {...register("mobilePhone")}
                name="mobilePhone"
                type="tel"
                autoComplete="tel-national"
                inputMode="numeric"
                placeholder="Ex: (11) 99999-9999"
                maxLength={15}
                required
                disabled={!!customer}
                onChange={async (event: any) => {
                  const { value } = event.target;
                  event.target.value = normalizePhoneNumberBrazil(value);
                  try {
                    z.string()
                      .min(15, "Telefone inválido")
                      .max(15, "Telefone inválido")
                      .parse(event.target.value);
                    clearErrors();
                    return event.target.value;
                  } catch (error) {
                    setError("mobilePhone", { message: "Telefone inválido" });
                  }
                }}
                className={cn(
                  " w-full rounded-md border border-stone-200 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white",
                  !!customer
                    ? "cursor-not-allowed border-stone-400 bg-stone-100 text-stone-700"
                    : "",
                  errors.mobilePhone?.message
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                    : watch("mobilePhone")
                    ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500"
                    : "",
                )}
              />
              {errors.mobilePhone && (
                <span className="text-left text-xs text-rose-500">
                  {errors.mobilePhone.message}
                </span>
              )}
            </div>
          </motion.ul>
        </motion.div>
        {!customer ? (
          <FormButton errors={errors} />
        ) : (
          <p className="text-xs text-emerald-500">
            Agora preencha as informações de endereço para prosseguir!
          </p>
        )}
      </section>
    </form>
  );
}

function FormButton({ errors }: any) {
  const { customer } = useContext(AsaasContext);
  const { pending } = useFormStatus();
  const isErrors: boolean = Object.keys(errors).length == 0;
  return (
    <button
      className={cn(
        "flex h-12 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
        pending || !!customer || !isErrors
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "bg-stone-900 text-white hover:bg-white hover:text-stone-600 dark:hover:bg-transparent",
      )}
      disabled={pending || !!customer || !isErrors}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Próxima etapa</p>}
    </button>
  );
}

const normalizePhoneNumberBrazil = (value: string) => {
  return (
    value
      .replace(/\D/g, "")
      .replace(
        /(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})/,
        (fullMatch, country, ddd, dddWithZero, prefixTel, suffixTel) => {
          if (country)
            return `${country} (${
              ddd || dddWithZero
            }) ${prefixTel}-${suffixTel}`;
          if (ddd || dddWithZero)
            return `(${ddd || dddWithZero}) ${prefixTel}-${suffixTel}`;
          if (prefixTel && suffixTel) return `${prefixTel}-${suffixTel}`;
          return value;
        },
      )
      .substring(0, 15) || ""
  );
};

const normalizeCPFNumber = (value: string) => {
  return (
    value
      .replace(/\D+/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1")
      .substring(0, 14) || ""
  );
};
