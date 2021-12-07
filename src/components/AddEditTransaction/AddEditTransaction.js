import React, { useState, useReducer, useEffect, useRef } from "react";
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

const FORMFIELDS_ACTION = {
  UPDATE_DESCR: "updatedescr",
  UPDATE_AMOUNT: "updateamount",
  REFRESH_ERRORS: "refresherrors",
};

const reducer = (formFields, action) => {
  switch (action.type) {
    case FORMFIELDS_ACTION.UPDATE_DESCR:
      return {
        ...formFields,
        description: {
          value: action.payload.value,
          errors: validateDescr(action.payload.value),
        },
      };
    case FORMFIELDS_ACTION.UPDATE_AMOUNT:
      return {
        ...formFields,
        amount: {
          value: action.payload.value,
          errors: validateAmount(action.payload.value),
        },
      };
    case FORMFIELDS_ACTION.REFRESH_ERRORS:
      return {
        ...formFields,
        description: {
          ...formFields.description,
          errors: validateDescr(formFields.description.value),
        },
        amount: {
          ...formFields.amount,
          errors: validateAmount(formFields.amount.value),
        },
      };
    default:
      console.log(`Unknown action: ${action.type}`);
      return formFields;
  }
};

// could move the below into separate files
const validateDescr = (descr) => {
  let errors = [];
  if (!descr.length) errors.push("Description must be entered.");
  if (descr.length && descr.length <= 3)
    errors.push("Description must be greater than 3 characters.");
  if (descr.length > 50)
    errors.push("Description must be 50 characters or less.");
  if (descr.toLowerCase().includes("goat"))
    errors.push("Description cannot include the word 'goat'.");
  return errors;
};
const validateAmount = (amount) => {
  let errors = [];
  if (!amount.length) errors.push("Amount must be entered.");
  if (parseFloat(amount) < 0)
    errors.push(
      "Amount must not be negative. Please ensure transaction is an Expense instead."
    );
  if (amount.includes("13")) errors.push("Amount must not include 13.");
  return errors;
};

export default function AddEditTransaction({ action, itemIdToEdit }) {
  console.log("Add/Edit component render");
  const [doValidation, setDoValidation] = useState(false);
  const { setExpenses } = useExpensesContext();
  const { setAddingOrEditing } = useAddEditContext();

  const incomeExpenseRef = useRef();

  let heading, existingItem, income, buttonLabel, FORMFIELDS_INITIAL;

  switch (action) {
    case ADDEDIT_ACTION.ADD:
      heading = "Add New Transaction";
      existingItem = "";
      FORMFIELDS_INITIAL = {
        description: {
          value: "",
          errors: [],
        },
        amount: {
          value: "",
          errors: [],
        },
      };
      income = true;
      buttonLabel = "Add Transaction";
      break;
    case ADDEDIT_ACTION.EDIT:
      const itemToEdit = setExpenses.getTransaction(itemIdToEdit);
      heading = "Edit Transaction";
      existingItem = <TransactionItem item={itemToEdit} readOnly />;
      income = itemToEdit.amount >= 0 ? true : false;
      buttonLabel = "Update Transaction";
      FORMFIELDS_INITIAL = {
        description: {
          value: itemToEdit.description,
          errors: [],
        },
        amount: {
          value:
            itemToEdit.amount < 0
              ? (itemToEdit.amount * -1).toFixed(2)
              : itemToEdit.amount.toFixed(2),
          errors: [],
        },
      };
      break;
    default:
      console.log(`Invalid action for AddEditTransaction: ${action}`);
      return;
  }

  const [formFields, dispatcher] = useReducer(reducer, FORMFIELDS_INITIAL);

  const errors = Object.keys(formFields).some(
    (f) => formFields[f].errors.length
  );

  // Initialize errors (if any)
  useEffect(() => {
    dispatcher({
      type: FORMFIELDS_ACTION.REFRESH_ERRORS,
    });
  }, []);

  const descriptionChangeHandler = (e) => {
    dispatcher({
      type: FORMFIELDS_ACTION.UPDATE_DESCR,
      payload: { value: e.target.value },
    });
  };
  const amountChangeHandler = (e) => {
    dispatcher({
      type: FORMFIELDS_ACTION.UPDATE_AMOUNT,
      payload: { value: e.target.value },
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!errors) {
      const data = {
        description: formFields.description.value,
        amount: formFields.amount.value,
        isIncome: incomeExpenseRef.current.checked,
      };
      switch (action) {
        case ADDEDIT_ACTION.ADD:
          setExpenses.addTransaction(data);
          break;
        case ADDEDIT_ACTION.EDIT:
          setExpenses.updateTransaction({ id: itemIdToEdit, ...data });
          break;
        default:
          console.log(`Invalid action for AddEditTransaction: ${action}`);
          return;
      }
      setAddingOrEditing(null);
    } else {
      setDoValidation(true);
    }
  };

  return (
    <form className={"main-component"} onSubmit={submitHandler}>
      <h2>{heading}</h2>
      {existingItem}
      <ToggleSwitch incomeExpenseRef={incomeExpenseRef} checked={income} />
      <Input
        label="Description"
        validFeedback={
          doValidation && !formFields.description.errors.length && "Thank you."
        }
        invalidFeedback={
          doValidation &&
          !!formFields.description.errors.length &&
          formFields.description.errors
        }
        input={{
          type: "text",
          id: "descr",
          placeholder: "Enter description ...",
          value: formFields.description.value,
          onChange: descriptionChangeHandler,
        }}
      />
      <Input
        label="Amount"
        validFeedback={
          doValidation && !formFields.amount.errors.length && "Thank you."
        }
        invalidFeedback={
          doValidation &&
          !!formFields.amount.errors.length &&
          formFields.amount.errors
        }
        input={{
          type: "number",
          id: "amount",
          step: 0.01,
          placeholder: "Enter amount ...",
          value: formFields.amount.value,
          onChange: amountChangeHandler,
        }}
      />
      <Button
        className={styles["button-margin"]}
        color={COLOR.PRIMARY}
        type={"submit"}
      >
        {buttonLabel}
      </Button>
      <Button
        type="button"
        onClick={() => setAddingOrEditing(null)}
        color={COLOR.SECONDARY}
      >
        Cancel
      </Button>
    </form>
  );
}

export { ADDEDIT_ACTION };
