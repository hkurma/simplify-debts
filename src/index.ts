import { Balances, Transaction } from "../types";

export const calcBalances = (transactions: Transaction[]): Balances => {
  const balances: Balances = {};
  transactions.forEach(transaction => {
    balances[transaction.from] = (balances[transaction.from] || 0) - transaction.amount;
    balances[transaction.to] = (balances[transaction.to] || 0) + transaction.amount;
  });
  return balances;
}

export const simplifyTransactions = (transactions: Transaction[]): Transaction[] => {
  const balances = calcBalances(transactions);
  const debtors = Object.keys(balances).filter(person => balances[person] < 0);
  const creditors = Object.keys(balances).filter(person => balances[person] > 0);
  const simplifiedTransactions: Transaction[] = [];
  while (debtors.length > 0 && creditors.length > 0) {
    const debtor = debtors[0];
    const creditor = creditors[0];
    const amountToTransfer = Math.min(Math.abs(balances[debtor]), balances[creditor]);
    simplifiedTransactions.push({ from: debtor, to: creditor, amount: amountToTransfer });
    balances[debtor] += amountToTransfer;
    balances[creditor] -= amountToTransfer;
    if (balances[debtor] === 0) debtors.shift();
    if (balances[creditor] === 0) creditors.shift();
  }
  return simplifiedTransactions;
}

