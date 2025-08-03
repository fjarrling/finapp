// src/config/currencies.ts
export const CURRENCIES = ["RUB", "USD", "EUR"] as const;

export type Currency = typeof CURRENCIES[number];

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
}

export const CURRENCY_CONFIG: Record<Currency, CurrencyInfo> = {
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar"
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro"
  },
  RUB: {
    code: "RUB",
    symbol: "₽",
    name: "Russian Ruble"
  }
} as const;


export const getCurrencySymbol = (currency: Currency): string => {
  return CURRENCY_CONFIG[currency]?.symbol || currency;
};

export const getCurrencyName = (currency: Currency): string => {
  return CURRENCY_CONFIG[currency]?.name || currency;
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  const symbol = getCurrencySymbol(currency);
  return `${amount.toLocaleString()} ${symbol}`;
};
