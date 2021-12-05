import React from "react";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import { Icon } from "@iconify/react";
import { ADDEDIT_ACTION } from "../../../components/AddEditTransaction/AddEditTransaction";
import { useExpensesContext } from "../../../store/expenses-context";
import toDollars from "../../../utilities/toDollars";
import styles from "./TransactionItem.module.css";

export default function TransactionItem({ item, readOnly, onActionClick }) {
  const { setExpenses } = useExpensesContext();
  const { amount, description } = item;

  const editHandler = () => {
    onActionClick({
      action: ADDEDIT_ACTION.EDIT,
      item,
    });
  };

  const deleteHandler = () => {
    setExpenses.deleteTransaction();
    onActionClick(null);
  };

  return (
    <div readOnly={readOnly} className={styles["relative-wrapper"]}>
      <div className={styles["absolute-wrapper"]}>
        <Card
          className={`${styles.item} ${
            amount < 0 ? styles["item--expense"] : styles["item--income"]
          }`}
        >
          <span>{description}</span>
          <span>{toDollars(amount)}</span>
        </Card>
        <Button
          onClick={editHandler}
          className={`${styles.action} ${styles["action--edit"]}`}
        >
          <Icon icon="entypo:pencil" />
        </Button>
        <Button
          onClick={deleteHandler}
          className={`${styles.action} ${styles["action--delete"]}`}
        >
          <Icon icon="bi:trash-fill" />
        </Button>
      </div>
    </div>
  );
}
