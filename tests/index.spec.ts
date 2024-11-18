import { calcBalances, simplifyTransactions } from "../src";
import { Balances, Transaction } from "../types"

const transactions: Transaction[] = [{
  from: "Alice",
  to: "Bob",
  amount: 100
}, {
  from: "Bob",
  to: "Charlie",
  amount: 50
}, {
  from: "Charlie",
  to: "Dave",
  amount: 80
}, {
  from: "Dave",
  to: "Eva",
  amount: 40
}, {
  from: "Eva",
  to: "Alice",
  amount: 20
}];

describe("Simplify debts", () => {
  test("should calculate balances", () => {
    const expectedBalances: Balances = {
      "Alice": -80,
      "Bob": 50,
      "Charlie": -30,
      "Dave": 40,
      "Eva": 20
    }
    const actualBalances = calcBalances(transactions);
    expect(actualBalances).toEqual(expectedBalances);
    const totalBalance = Object.keys(actualBalances).reduce((total, name) => total + actualBalances[name], 0);
    expect(totalBalance).toEqual(0);
  });
  test("should simplify trasnactions", () => {
    const expectedSimplifiedTransactions: Transaction[] = [{
      from: "Alice",
      to: "Bob",
      amount: 50
    }, {
      from: "Alice",
      to: "Dave",
      amount: 30
    }, {
      from: "Charlie",
      to: "Dave",
      amount: 10
    }, {
      from: "Charlie",
      to: "Eva",
      amount: 20
    }];
    const actualSimplifiedTransactions = simplifyTransactions(transactions);
    expect(actualSimplifiedTransactions).toEqual(expectedSimplifiedTransactions);
  })
})