export type Transaction = {
  from: string;
  to: string;
  amount: number;
}

export type Balances = {
  [name: string]: number;
}