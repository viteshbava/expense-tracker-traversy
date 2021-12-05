import React, { useContext, useReducer, useState } from "react";

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
    { id: "003", description: "Food", amount: 20.001 },
    { id: "004", description: "Dividends", amount: 52.5 },
    { id: "005", description: "Salary", amount: 60.004 },
    { id: "006", description: "Favour", amount: 0 },
  ],
  totalBalance: 0,
  totalIncome: 0,
  totalExpense: 0,
};

const reducer = (expenses, action) => {
  switch (action.type) {
    case EXPENSES_ACTIONS.ADD:
      const newItem = {
        ...action.payload,
        id: Math.random().toString(),
      };
      return { ...expenses, transactions: [newItem, ...expenses.transactions] };
    case EXPENSES_ACTIONS.UPDATE:
    // return addItemToCart(cart, action.payload);
    case EXPENSES_ACTIONS.DELETE:
    // return removeItemFromCart(cart, action.payload);

    default:
      console.log(`Unknown action: ${action.type}`);
      return expenses;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expenses, dispatcher] = useReducer(reducer, EXPENSES_INITIAL);
  const [addingOrEditing, setAddingOrEditing] = useState(null);

  const setExpenses = {
    getTransaction: (id) => expenses.transactions.find((t) => t.id === id),

    addTransaction: (payload) => {
      console.log("add transaction");
      dispatcher({ type: EXPENSES_ACTIONS.ADD, payload });
    },

    updateTransaction: () => {
      console.log("update transaction");
    },

    deleteTransaction: () => {
      console.log("delete transaction");
    },
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
