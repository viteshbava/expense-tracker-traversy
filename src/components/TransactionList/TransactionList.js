import React from "react";
import TransactionItem from "./TransactionItem/TransactionItem";
import { useExpensesContext } from "../../store/expenses-context";

export default function TransactionList() {
  const { expenses } = useExpensesContext();

  console.log(expenses);

  const content = expenses.transactions.length ? (
    expenses.transactions.map((t) => <TransactionItem key={t.id} item={t} />)
  ) : (
    <div>No transactions to view.</div>
  );

  return (
    <div className={"main-component"}>
      <h2>History</h2>
      <ul>{content}</ul>
    </div>
  );
}
