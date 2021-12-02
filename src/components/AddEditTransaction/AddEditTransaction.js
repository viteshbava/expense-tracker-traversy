import React from "react";
import Button, { COLOR } from "../UI/Button/Button";
import TransactionItem from "../TransactionList/TransactionItem/TransactionItem";
import Input from "../UI/Input/Input";

const ADDEDIT_ACTION = {
  ADD: "add",
  EDIT: "edit",
};

export default function AddEditTransaction({ action, itemToEdit, onCancel }) {
  let heading, existingItem, description, income, amount, buttonLabel;
  switch (action) {
    case ADDEDIT_ACTION.ADD:
      heading = "Add New Transaction";
      existingItem = "";
      description = "";
      income = true;
      amount = "";
      buttonLabel = "Add Transaction";
      break;
    case ADDEDIT_ACTION.EDIT:
      heading = "Edit Transaction";
      existingItem = <TransactionItem key={itemToEdit.id} item={itemToEdit} />;
      description = itemToEdit.description;
      income = itemToEdit.amount >= 0 ? true : false;
      amount = itemToEdit.amount;
      buttonLabel = "Update Transaction";
      break;
    default:
      console.log(`Invalid action for AddEditTransaction: ${action}`);
      return;
  }

  return (
    <div className={"main-component"}>
      <h2>{heading}</h2>
      {existingItem}
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
        label="Amount"
        input={{
          type: "number",
          id: "amount",
          step: 0.01,
          placeholder: "Enter amount ...",
          defaultValue: amount,
        }}
      />
      <Button color={COLOR.PRIMARY}>{buttonLabel}</Button>
      <Button onClick={() => onCancel()} color={COLOR.SECONDARY}>
        Cancel
      </Button>
    </div>
  );
}

export { ADDEDIT_ACTION };
