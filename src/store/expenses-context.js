import React, { useContext, useReducer, useState, useEffect } from "react";

const ExpensesContext = React.createContext();

const useExpensesContext = () => {
  return useContext(ExpensesContext);
};

const EXPENSES_ACTIONS = {
  ADD: "add",
  UPDATE: "update",
  DELETE: "delete",
};

const EXPENSES_INITIAL = {
  transactions: [
    { id: "001", description: "Batteries", amount: -9.99 },
    { id: "002", description: "Food", amount: -20.001 },
    { id: "003", description: "Alcohol", amount: 20.001 },
    { id: "004", description: "Dividends", amount: 52.5 },
    { id: "005", description: "Salary", amount: 60.004 },
    { id: "006", description: "Favour", amount: 0 },
  ],
};

// this should probably be in a separate file
const reducer = (expenses, action) => {
  switch (action.type) {
    case EXPENSES_ACTIONS.ADD:
      const newItem = {
        ...action.payload,
        id: Math.random().toString(),
      };
      return { ...expenses, transactions: [newItem, ...expenses.transactions] };

    case EXPENSES_ACTIONS.UPDATE:
      const index = expenses.transactions.findIndex(
        (i) => i.id === action.payload.id
      );
      const existingItem = expenses.transactions[index];
      const updatedItem = {
        ...existingItem,
        description: action.payload.description,
        amount: action.payload.amount,
      };
      const updatedItems = [...expenses.transactions];
      updatedItems[index] = updatedItem;
      return {
        ...expenses,
        transactions: updatedItems,
      };

    case EXPENSES_ACTIONS.DELETE:
      return {
        ...expenses,
        transactions: expenses.transactions.filter(
          (t) => t.id !== action.payload.id
        ),
      };
    default:
      console.log(`Unknown action: ${action.type}`);
      return expenses;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expenses, dispatcher] = useReducer(reducer, EXPENSES_INITIAL);
  const [addingOrEditing, setAddingOrEditing] = useState(null);

  useEffect(() => {}, []);

  const setExpenses = {
    getTransaction: (id) => expenses.transactions.find((t) => t.id === id),
    addTransaction: ({ description, amount, isIncome }) => {
      const payload = {
        description,
        amount: isIncome ? parseFloat(amount) : parseFloat(amount) * -1,
      };
      dispatcher({ type: EXPENSES_ACTIONS.ADD, payload });
    },
    updateTransaction: ({ id, description, amount, isIncome }) => {
      const payload = {
        id,
        description,
        amount: isIncome ? parseFloat(amount) : parseFloat(amount) * -1,
      };
      dispatcher({ type: EXPENSES_ACTIONS.UPDATE, payload });
    },
    deleteTransaction: (id) =>
      dispatcher({ type: EXPENSES_ACTIONS.DELETE, payload: { id } }),
  };

  return (
    <ExpensesContext.Provider
      value={{ expenses, setExpenses, addingOrEditing, setAddingOrEditing }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
export { useExpensesContext };
