import React, { useRef } from "react";
import Button, { COLOR } from "../UI/Button/Button";
import TransactionItem from "../TransactionList/TransactionItem/TransactionItem";
import Input from "../UI/Input/Input";
import ToggleSwitch from "../UI/ToggleSwitch/ToggleSwitch";
import { useExpensesContext } from "../../store/expenses-context";
import { useAddEditContext } from "../../store/addEdit-context";
import styles from "./AddEditTransaction.module.css";

const ADDEDIT_ACTION = {
  ADD: "add",
  EDIT: "edit",
};

export default function AddEditTransaction({ action, itemIdToEdit }) {
  const { setExpenses } = useExpensesContext();
  const { setAddingOrEditing } = useAddEditContext();

  const descrRef = useRef();
  const amountRef = useRef();
  const incomeExpenseRef = useRef();

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
      buttonConfirmHandler = () => {
        setExpenses.addTransaction({
          description: descrRef.current.value,
          amount: amountRef.current.value,
          isIncome: incomeExpenseRef.current.checked,
        });
        setAddingOrEditing(null);
      };
      break;
    case ADDEDIT_ACTION.EDIT:
      const itemToEdit = setExpenses.getTransaction(itemIdToEdit);
      heading = "Edit Transaction";
      existingItem = <TransactionItem item={itemToEdit} readOnly />;
      description = itemToEdit.description;
      income = itemToEdit.amount >= 0 ? true : false;
      (amount =
        itemToEdit.amount < 0
          ? (itemToEdit.amount * -1).toFixed(2)
          : itemToEdit.amount.toFixed(2)),
        (buttonLabel = "Update Transaction");
      buttonConfirmHandler = () => {
        setExpenses.updateTransaction({
          id: itemIdToEdit,
          description: descrRef.current.value,
          amount: amountRef.current.value,
          isIncome: incomeExpenseRef.current.checked,
        });
        setAddingOrEditing(null);
      };
      break;
    default:
      console.log(`Invalid action for AddEditTransaction: ${action}`);
      return;
  }

  return (
    <div className={"main-component"}>
      <h2>{heading}</h2>
      {existingItem}
      <ToggleSwitch incomeExpenseRef={incomeExpenseRef} checked={income} />
      <Input
        label="Description"
        input={{
          ref: descrRef,
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
          ref: amountRef,
          type: "number",
          id: "amount",
          min: 0,
          step: 1,
          placeholder: "Enter amount ...",
          defaultValue: amount,
        }}
      />
      <Button onClick={buttonConfirmHandler} color={COLOR.PRIMARY}>
        {buttonLabel}
      </Button>
      <Button onClick={() => setAddingOrEditing(null)} color={COLOR.SECONDARY}>
        Cancel
      </Button>
    </div>
  );
}

export { ADDEDIT_ACTION };
