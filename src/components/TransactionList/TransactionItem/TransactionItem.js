import React from "react";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import { Icon } from "@iconify/react";
import styles from "./TransactionItem.module.css";

export default function TransactionItem({ item, readOnly }) {
  const { description } = item;
  const amount = (Math.round(item.amount * 100) / 100).toFixed(2);
  return (
    <div readOnly={readOnly} className={styles["relative-wrapper"]}>
      <div className={styles["absolute-wrapper"]}>
        <Card
          className={`${styles.item} ${
            amount < 0 ? styles["item--expense"] : styles["item--income"]
          }`}
        >
          <span>{description}</span>
          <span>{amount}</span>
        </Card>
        <Button className={`${styles.action} ${styles["action--edit"]}`}>
          <Icon icon="entypo:pencil" />
        </Button>
        <Button className={`${styles.action} ${styles["action--delete"]}`}>
          <Icon icon="bi:trash-fill" />
        </Button>
      </div>
    </div>
  );
}
