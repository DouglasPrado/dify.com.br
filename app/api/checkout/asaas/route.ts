import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = process.env.ASAAS_URL + "/v3/payments/";
  const data: any = req.body || "";
  if (data.billingType === "CREDIT_CARD") {
    let creditCard: any;
    let creditCardHolderInfo: any;
    const date = data.date as string;
    const splitDate = date.split(" / ");
    creditCard = {
      number: data.number,
      ccv: data.ccv,
      holderName: data.holderName,
      expiryMonth: splitDate[0],
      expiryYear: splitDate[1],
    };

    const urlCustomer =
      process.env.ASAAS_URL + "/v3/customers/" + data.customer;
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
    const installment = data.installmentCount as string;
    if (installment !== undefined && +installment > 1 && data.value) {
      data.installment = +installment || 1;
      data.installmentValue = +(data.value / +installment);
    }

    data.creditCardHolderInfo = creditCardHolderInfo;
    data.creditCard = creditCard;
  }
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      access_token: `$${process.env.ASAAS_TOKEN}==`,
    },
    body: JSON.stringify(data),
  };
  const respAsaas = await fetch(url, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error("error:" + err));

  return NextResponse.json(respAsaas);
}
