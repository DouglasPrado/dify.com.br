export function throwError(code: number, message: string) {
  const state = JSON.stringify({
    error: { message: message, code: code },
  });

  return JSON.parse(state);
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function truncate(text: string, length = 10) {
  if (text && text.length >= length && length >= 0) {
    return text.slice(0, length) + "...";
  }
  return text;
}

export function validateCPF(value: any) {
  if (value.length !== 11 && value.length !== 14) {
    return false;
  }
  value = value.replace(/[^\d]+/g, "");

  value = value.toString().replace(/[^\d]+/g, "");
  if (!value && value === "" && value.match(/^[0-9]*$/)) {
    return false;
  }
  let add = 0;
  for (let i = 0; i < 9; i++) {
    add += parseInt(value.charAt(i)) * (10 - i);
  }
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) {
    rev = 0;
  }
  if (rev != parseInt(value.charAt(9))) {
    return false;
  }
  add = 0;
  for (let i = 0; i < 10; i++) {
    add += parseInt(value.charAt(i)) * (11 - i);
  }
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) {
    rev = 0;
  }
  if (rev != parseInt(value.charAt(10))) {
    return false;
  }
  return true;
}

export function validateCNPJ(value: any) {
  if (value.length !== 14 && value.length !== 18) {
    return false;
  }
  value = value.toString().replace(/[^\d]+/g, "");
  if (!value && value === "" && value.match(/^[0-9]*$/)) {
    return false;
  }

  let length = value.length - 2;
  let numbers = value.substring(0, length);
  let digits = value.substring(length);
  let sum = 0;
  let pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result != digits.charAt(0)) return false;
  length = length + 1;
  numbers = value.substring(0, length);
  sum = 0;
  pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result != digits.charAt(1)) {
    return false;
  }
  return true;
}

export function getCardType(number: string) {
  if (!number) {
    return null;
  }
  number = number.replace(/[^\d]+/g, "");
  // visa
  let re = new RegExp("^4");
  if (number.match(re) != null) {
    return "visa";
  }

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number,
    )
  ) {
    return "mastercard";
  }
  // AMEX
  re = new RegExp("^3[47]");
  if (number.match(re) != null) {
    return "amex";
  }

  // Discover
  re = new RegExp(
    "^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)",
  );
  if (number.match(re) != null) {
    return "dicover";
  }

  // Diners
  re = new RegExp("^36");
  if (number.match(re) != null) {
    return "diners";
  }

  // Diners - Carte Blanche
  re = new RegExp("^30[0-5]");
  if (number.match(re) != null) {
    return "diners";
  }

  // JCB
  re = new RegExp("^35(2[89]|[3-8][0-9])");
  if (number.match(re) != null) {
    return "jcb";
  }

  // Visa Electron
  re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
  if (number.match(re) != null) {
    return "visa_electron";
  }

  return null;
}

export function validateDateBrazil(value: any, min = 1900, max = 2100) {
  if (!value) {
    return true;
  }
  let date = value.split("/");
  if (date.length !== 3) {
    return false;
  }
  let day = date[0];
  let month = date[1];
  let year = date[2];
  if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
    return false;
  }
  if (day < 1 || day > 31) {
    return false;
  }
  if (month < 1 || month > 12) {
    return false;
  }
  if (year < min || year > max) {
    return false;
  }
  return new Date(`${year}-${month}-${day}`);
}

export const greetingMessage = (locale?: string) => {
  const hour: any = new Date().toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: false,
  });
  if (hour >= 0 && hour <= 5) {
    return "Boa madrugada";
  } else if (hour >= 6 && hour < 12) {
    return "Bom dia";
  } else if (hour >= 12 && hour < 18) {
    return "Boa tarde";
  } else if (hour >= 18 && hour <= 23) {
    return "Boa noite";
  }
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0.0);
};


