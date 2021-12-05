import React, { useContext, useReducer, useState } from "react";

const ExpensesContext = React.createContext();

const useExpensesContext = () => {
  return useContext(ExpensesContext);
};

const EXPENSES_ACTIONS = {};

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
  // switch (action.type) {
  //   case CART_ACTIONS.TOGGLE_DISPLAY:
  //     // return { ...cart, display: action.payload };
  //   case CART_ACTIONS.ADD_ITEM:
  //     // return addItemToCart(cart, action.payload);
  //   case CART_ACTIONS.REMOVE_ITEM:
  //     // return removeItemFromCart(cart, action.payload);
  //   case CART_ACTIONS.UPDATE_AMOUNT:
  //     // return updateItemAmount(cart, action.payload);
  //   case CART_ACTIONS.CLEAR_CART:
  //     return EXPENSES_INITIAL;
  //   default:
  //     console.log(`Unknown cart action: ${action.type}`);
  //     return cart;
  // }
};

const ExpensesContextProvider = ({ children }) => {
  const [expenses, dispatcher] = useReducer(reducer, EXPENSES_INITIAL);
  const [addingOrEditing, setAddingOrEditing] = useState(null);

  const setExpenses = {
    addTransaction: () => {
      console.log("add transaction");
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
