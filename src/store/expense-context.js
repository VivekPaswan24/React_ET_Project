import axios from "axios";
import React, { useEffect, useState } from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  totalAmount: 0,
  addExpense: () => {},
});

export default ExpenseContext;

export const ExpenseProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(()=>{
    async function getData(){
      try{
        const response=await axios.get("https://expensetrackerdata-591b9-default-rtdb.firebaseio.com/expenses.json")
        const data=response.data
        const loadedExpenses=[]
        for(const key in data){
          loadedExpenses.push({
            id:key,
            amount:data[key].expense.amount,
            category:data[key].expense.category,
            description:data[key].expense.description
          })
        }
        setExpenses(loadedExpenses);
      }catch(error){
        console.log(error)
      }
    }
    getData();
  },[])

  const addExpenseHandler = async(expense) => {
    try{
      await axios.post("https://expensetrackerdata-591b9-default-rtdb.firebaseio.com/expenses.json",{expense})
      setExpenses((prevState)=>{
        const updatedexpenses=prevState.concat(expense);
        return updatedexpenses;
      })
    }catch(error){
      console.log(error)
    }
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
