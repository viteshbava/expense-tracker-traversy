import React from "react";
import { useExpensesContext } from "../../store/expenses-context";
import toDollars from "../../utilities/toDollars";

export default function YourBalance() {
  const { totalBalance } = useExpensesContext().expenses;
  return (
    <div className={"main-component"}>
      <h3 className={"capHeading"}>Your balance</h3>
      <h1>{toDollars(totalBalance)}</h1>
    </div>
  );
}
