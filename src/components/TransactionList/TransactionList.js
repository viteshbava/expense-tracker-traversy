import React from "react";
import TransactionItem from "./TransactionItem/TransactionItem";

const DUMMY_TRANSACTIONS = [
  { id: "001", description: "Batteries", amount: -9.99 },
  { id: "002", description: "Food", amount: -20.001 },
  { id: "003", description: "Food", amount: 20.001 },
  { id: "004", description: "Dividends", amount: 52.5 },
  { id: "005", description: "Salary", amount: 60.004 },
  { id: "006", description: "Favour", amount: 0 },
];

export default function TransactionList({ onEdit }) {
  const content = DUMMY_TRANSACTIONS.map((t) => (
    <TransactionItem key={t.id} item={t} onEdit={onEdit} />
  ));

  return (
    <div className={"main-component"}>
      <h2>History</h2>
      {content}
    </div>
  );
}
