import React from "react";
import TransactionItem from "./TransactionItem/TransactionItem";
import { useExpensesContext } from "../../store/expenses-context";

// const DUMMY_TRANSACTIONS = [
//   { id: "001", description: "Batteries", amount: -9.99 },
//   { id: "002", description: "Food", amount: -20.001 },
//   { id: "003", description: "Food", amount: 20.001 },
//   { id: "004", description: "Dividends", amount: 52.5 },
//   { id: "005", description: "Salary", amount: 60.004 },
//   { id: "006", description: "Favour", amount: 0 },
// ];

export default function TransactionList() {
  const { expenses } = useExpensesContext();

  console.log(expenses);

  const content = expenses.transactions.map((t) => (
    <TransactionItem key={t.id} item={t} />
  ));

  return (
    <div className={"main-component"}>
      <h2>History</h2>
      {content}
    </div>
  );
}
