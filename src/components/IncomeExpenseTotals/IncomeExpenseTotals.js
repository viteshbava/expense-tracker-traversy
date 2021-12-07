import React from "react";
import Card from "../UI/Card/Card";
import styles from "./IncomeExpenseTotals.module.css";
import { useExpensesContext } from "../../store/expenses-context";
import toDollars from "../../utilities/toDollars";

export default function IncomeExpenseTotals() {
  const totalIncome = useExpensesContext()
    .expenses.transactions.filter((t) => t.amount > 0)
    .reduce((total, t) => total + t.amount, 0);
  const totalExpense =
    useExpensesContext()
      .expenses.transactions.filter((t) => t.amount < 0)
      .reduce((total, t) => total + t.amount, 0) * -1;

  return (
    <Card className={`${styles.container} main-component`}>
      <div className={styles.income}>
        <h3 className={"capHeading"}>Income</h3>
        <p>{toDollars(totalIncome)}</p>
      </div>
      <div className={styles.expense}>
        <h3 className={"capHeading"}>Expense</h3>
        <p>{toDollars(totalExpense)}</p>
      </div>
    </Card>
  );
}
