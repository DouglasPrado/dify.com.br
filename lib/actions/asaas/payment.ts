"use server";

export type PaymentProps = {
  customer: string;
  value: number;
  dueDate: string;
};

export const createPayment = async (formData: FormData) => {
  const customer = formData.get("customer") as string;
  const value = formData.get("value") as number | null;
  const billingType = formData.get("billingType") as string;
  let data: any = {};
  if (billingType === "CREDIT_CARD") {
    let creditCard: any;
    let creditCardHolderInfo: any;
    const date = formData.get("date") as string;
    const splitDate = date.split(" / ");
    creditCard = {
      number: formData.get("number"),
      ccv: formData.get("ccv"),
      holderName: formData.get("holderName"),
      expiryMonth: splitDate[0],
      expiryYear: splitDate[1],
    };

    const urlCustomer = process.env.ASAAS_URL + "/v3/customers/" + customer;
    creditCardHolderInfo = await fetch(urlCustomer, {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        access_token: `$${process.env.ASAAS_TOKEN}==`,
      },
    })
      .then((res) => res.json())
      .then((customer: any) => {
        return {
          name: customer.name,
          email: customer.email,
          cpfCnpj: customer.cpfCnpj,
          postalCode: customer.postalCode,
          addressNumber: customer.addressNumber,
          addressComplement: customer.addressComplement || null,
          phone: customer.mobilePhone,
          mobilePhone: customer.mobilePhone,
        };
      });

    //Adicionar parcelamento
    const installment = formData.get("installmentCount") as string;
    if (installment !== undefined && +installment > 1 && value) {
      data.installment = +installment || 1;
      data.installmentValue = +(value / +installment);
    }

    data.creditCardHolderInfo = creditCardHolderInfo;
    data.creditCard = creditCard;
  }

  const url = process.env.ASAAS_URL + "/v3/payments/";
  const dueDate = new Date();

  data.billingType = billingType || "UNDEFINED";
  data.customer = customer;
  data.value = value;
  data.dueDate = `${dueDate.getFullYear()}-${String(
    dueDate.getMonth() + 1,
  ).padStart(2, "0")}-${String(dueDate.getDate()).padStart(2, "0")}`;

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      access_token: `$${process.env.ASAAS_TOKEN}==`,
    },
    body: JSON.stringify(data),
  };
  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error("error:" + err));
};

export const getPaymentPIX = async (id: string) => {
  const url = process.env.ASAAS_URL + `/v3/payments/${id}/pixQrCode`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      access_token: `$${process.env.ASAAS_TOKEN}==`,
    },
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error("error:" + err));
};

export const getPaymentBoleto = async (id: string) => {
  const url = process.env.ASAAS_URL + `/v3/payments/${id}/identificationField`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      access_token: `$${process.env.ASAAS_TOKEN}==`,
    },
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error("error:" + err));
};
