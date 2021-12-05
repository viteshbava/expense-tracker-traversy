import React from "react";
import Button, { COLOR } from "../UI/Button/Button";
import TransactionItem from "../TransactionList/TransactionItem/TransactionItem";
import Input from "../UI/Input/Input";
import ToggleSwitch from "../UI/ToggleSwitch/ToggleSwitch";
import { useExpensesContext } from "../../store/expenses-context";
import styles from "./AddEditTransaction.module.css";

const ADDEDIT_ACTION = {
  ADD: "add",
  EDIT: "edit",
};

export default function AddEditTransaction({ action, itemToEdit, onCancel }) {
  const { setExpenses } = useExpensesContext();

  let heading,
    existingItem,
    description,
    income,
    amount,
    buttonLabel,
    buttonConfirmHandler;

  switch (action) {
    case ADDEDIT_ACTION.ADD:
      heading = "Add New Transaction";
      existingItem = "";
      description = "";
      income = true;
      amount = "";
      buttonLabel = "Add Transaction";
      buttonConfirmHandler = () => setExpenses.addTransaction();
      break;
    case ADDEDIT_ACTION.EDIT:
      heading = "Edit Transaction";
      existingItem = (
        <TransactionItem key={itemToEdit.id} item={itemToEdit} readOnly />
      );
      description = itemToEdit.description;
      income = itemToEdit.amount >= 0 ? true : false;
      (amount =
        itemToEdit.amount < 0
          ? (itemToEdit.amount * -1).toFixed(2)
          : itemToEdit.amount.toFixed(2)),
        (buttonLabel = "Update Transaction");
      buttonConfirmHandler = () => setExpenses.updateTransaction();
      break;
    default:
      console.log(`Invalid action for AddEditTransaction: ${action}`);
      return;
  }

  return (
    <div className={"main-component"}>
      <h2>{heading}</h2>
      {existingItem}
      <ToggleSwitch checked={income} />
      <Input
        label="Description"
        input={{
          type: "text",
          id: "descr",
          placeholder: "Enter description ...",
          defaultValue: description,
        }}
      />
      <Input
        className={styles["last-input"]}
        label="Amount"
        input={{
          type: "number",
          id: "amount",
          step: 1,
          placeholder: "Enter amount ...",
          defaultValue: amount,
        }}
      />
      <Button onClick={buttonConfirmHandler} color={COLOR.PRIMARY}>
        {buttonLabel}
      </Button>
      <Button onClick={() => onCancel()} color={COLOR.SECONDARY}>
        Cancel
      </Button>
    </div>
  );
}

export { ADDEDIT_ACTION };
