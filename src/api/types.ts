export type AccountResponse = {
  data: Array<{
    accountId: string;
    accountName: string;
    currency: "USD" | "CAD" | "EUR" | "GBP" | "AUD" | "JPY";
    country: string;
    address: string;
    phoneNumber: string;
    email: string;
  }>;
  error: string;
}


export type AccountResponseError = {
  data: null;
  error: string;
}

export type Transaction = {
  transactionId: string;
  direction: "inflow" | "outflow";
  amount: number;
  currency: "USD" | "CAD" | "EUR" | "GBP" | "AUD" | "JPY";
  destinationId: string;
  destinationName: string;
  sourceId: string;
  sourceName: string;
};
