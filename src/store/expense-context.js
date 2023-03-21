import React, { useState } from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  totalAmount: 0,
  addExpense: () => {},
});

export default ExpenseContext;

export const ExpenseProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addExpenseHandler = (expense) => {
    setExpenses((prevState)=>{
        const updatedExpenses=prevState.concat(expense);
        return updatedExpenses;
    })
    setTotalAmount((prevAmount)=>{
        return prevAmount=prevAmount+expense.amount
    })
  };

  const expenseContext = {
    expenses: expenses,
    totalAmount: totalAmount,
    addExpense: addExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
