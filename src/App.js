import React, { useState } from "react";
import styles from "./App.module.css";
import YourBalance from "./components/YourBalance/YourBalance";
import IncomeExpenseTotals from "./components/IncomeExpenseTotals/IncomeExpenseTotals";
import TransactionList from "./components/TransactionList/TransactionList";
import AddEditTransaction, {
  ADDEDIT_ACTION,
} from "./components/AddEditTransaction/AddEditTransaction";
import Button, { COLOR } from "./components/UI/Button/Button";

const testItem = { id: "001", description: "Batteries", amount: -9.99 };

function App() {
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
        <TransactionList onEdit={setAddingOrEditing} />
        <Button
          onClick={() => addTransactionHandler({ action: ADDEDIT_ACTION.ADD })}
          color={COLOR.PRIMARY}
        >
          Add Transaction
        </Button>
        <Button
          onClick={() =>
            addTransactionHandler({
              action: ADDEDIT_ACTION.EDIT,
              item: testItem,
            })
          }
          color={COLOR.PRIMARY}
        >
          Edit Transaction
        </Button>
      </>
    );
  }

  return (
    <>
      <h1 className={styles.title}>Expense Tracker</h1>
      <div className={styles.container}>
        <YourBalance />
        <IncomeExpenseTotals />
        {body}
      </div>
    </>
  );
}

export default App;
