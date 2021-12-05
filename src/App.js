import React, { useState } from "react";
import styles from "./App.module.css";
import YourBalance from "./components/YourBalance/YourBalance";
import IncomeExpenseTotals from "./components/IncomeExpenseTotals/IncomeExpenseTotals";
import TransactionList from "./components/TransactionList/TransactionList";
import AddEditTransaction, {
  ADDEDIT_ACTION,
} from "./components/AddEditTransaction/AddEditTransaction";
import ExpensesContextProvider from "./store/expenses-context";
import Button, { COLOR } from "./components/UI/Button/Button";

function App() {
  console.log("App render");
  const [addingOrEditing, setAddingOrEditing] = useState(null);

  const addTransactionHandler = (action) => {
    setAddingOrEditing(action);
  };

  let body;
  if (addingOrEditing) {
    body = (
      <AddEditTransaction
        action={addingOrEditing.action}
        itemToEdit={addingOrEditing.item}
        onCancel={() => setAddingOrEditing(null)}
      />
    );
  } else {
    body = (
      <>
        <TransactionList onActionClick={setAddingOrEditing} />
        <Button
          onClick={() => addTransactionHandler({ action: ADDEDIT_ACTION.ADD })}
          color={COLOR.PRIMARY}
        >
          Add Transaction
        </Button>
      </>
    );
  }

  return (
    <ExpensesContextProvider>
      <h1 className={styles.title}>Expense Tracker</h1>
      <div className={styles.container}>
        <YourBalance />
        <IncomeExpenseTotals />
        {body}
      </div>
    </ExpensesContextProvider>
  );
}

export default App;
