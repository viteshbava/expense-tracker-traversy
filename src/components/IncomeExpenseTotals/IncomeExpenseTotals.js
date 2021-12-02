import React from "react";
import Card from "../UI/Card/Card";
import styles from "./IncomeExpenseTotals.module.css";

export default function IncomeExpenseTotals() {
  return (
    <Card className={`${styles.container} main-component`}>
      <div className={styles.income}>
        <h3 className={"capHeading"}>Income</h3>
        <p>$100.00</p>
      </div>
      <div className={styles.expense}>
        <h3 className={"capHeading"}>Expense</h3>
        <p>$50.00</p>
      </div>
    </Card>
  );
}
