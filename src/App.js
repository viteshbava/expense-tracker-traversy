import styles from "./App.module.css";
import YourBalance from "./components/YourBalance/YourBalance";
import IncomeExpenseTotals from "./components/IncomeExpenseTotals/IncomeExpenseTotals";
import TransactionList from "./components/TransactionList/TransactionList";
import AddEditTransaction from "./components/AddEditTransaction/AddEditTransaction";

function App() {
  return (
    <>
      <h1 className={styles.title}>Expense Tracker</h1>
      <div className={styles.container}>
        <YourBalance />
        <IncomeExpenseTotals />
        <TransactionList />
        <AddEditTransaction />
        <div>UI: Add New Transaction</div>
      </div>
    </>
  );
}

export default App;
