"use server";

export type CustomerProps = {
  name: string;
  cpfCnpj: string;
  groupName: string;
  email?: string;
  phone?: string;
  mobilePhone?: string;
};

export type PaymentProps = {
  customer: string;
  value: number;
  dueDate: string;
};

export const createCustomer = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const cpfCnpj = formData.get("cpfCnpj") as string;
  const groupName = formData.get("groupName") as string;
  const email = formData.get("email") as string;
  const mobilePhone = formData.get("mobilePhone") as string;
  const url = process.env.ASAAS_URL + "/v3/customers";

  const data = {
    name,
    cpfCnpj,
    email,
    mobilePhone,
  };

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
    .catch((err) => console.error("error: ++" + err + "++"));
};

export const updateCustomer = async (id: string, formData: FormData) => {
  const address = formData.get("address") as string;
  const addressNumber = formData.get("addressNumber") as string;
  const complement = formData.get("complement") as string;
  const province = formData.get("province") as string;
  const postalCode = formData.get("postalCode") as string;
  const url = process.env.ASAAS_URL + `/v3/customers/${id}`;
  const options = {
    method: "PUT",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      access_token: `$${process.env.ASAAS_TOKEN}==`,
    },
    body: JSON.stringify({
      address,
      addressNumber,
      complement,
      province,
      postalCode,
    }),
  };
  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error("error:" + err));
};
