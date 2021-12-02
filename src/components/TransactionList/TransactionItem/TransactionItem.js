import React from "react";
import Card from "../../UI/Card/Card";
import styles from "./TransactionItem.module.css";

export default function TransactionItem({ item }) {
  const { description } = item;
  const amount = (Math.round(item.amount * 100) / 100).toFixed(2);
  return (
    <Card
      className={`${styles.item} ${
        amount < 0 ? styles["item--expense"] : styles["item--income"]
      }`}
    >
      <span>{description}</span>
      <span>{amount}</span>
    </Card>
  );
}
