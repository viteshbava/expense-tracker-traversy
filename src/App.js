import React, { useState } from "react";
import styles from "./App.module.css";
import YourBalance from "./components/YourBalance/YourBalance";
import IncomeExpenseTotals from "./components/IncomeExpenseTotals/IncomeExpenseTotals";
import TransactionList from "./components/TransactionList/TransactionList";
import AddEditTransaction from "./components/AddEditTransaction/AddEditTransaction";
import Button, { COLOR, SIZE } from "./components/UI/Button/Button";

function App() {
  const [addingOrEditing, setAddingOrEditing] = useState(false);

  const addTransactionHandler = () => {
    setAddingOrEditing(true);
  };

  let body;
  if (addingOrEditing) {
    body = <AddEditTransaction onCancel={() => setAddingOrEditing(false)} />;
  } else {
    body = (
      <>
        <TransactionList />
        <Button onClick={addTransactionHandler} color={COLOR.PRIMARY}>
          Add Transaction
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
