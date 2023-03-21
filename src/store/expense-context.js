import axios from "axios";
import React, { useEffect, useState } from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  totalAmount: 0,
  addExpense: (expense) => {},
  removeExpense:(id)=>{},
  editExpense:(id)=>{}
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

  const addExpenseHandler = async(expense,id) => {
    if(id){
      try{
        await axios.put(`https://expensetrackerdata-591b9-default-rtdb.firebaseio.com/expenses/${id}.json`,{expense})
        setExpenses((prevState)=>{
          const existingExpenseIndex=prevState.findIndex((ele)=>ele.id===id)
          const updatedexpenses=[...prevState]
          const updatedexpense={
            ...expense,
            id:id
          }
           updatedexpenses[existingExpenseIndex]=updatedexpense
           return updatedexpenses;
        })
      }catch(error){
        console.log(error)
      }
     
    }else{
      try{
        const response=await axios.post("https://expensetrackerdata-591b9-default-rtdb.firebaseio.com/expenses.json",{expense})
        setExpenses((prevState)=>{
          const updatedexpenses=prevState.concat({...expense,id:response.data.name});
          return updatedexpenses;
        })
      }catch(error){
        console.log(error)
      }
    }
    setTotalAmount(0)
    }

  const removeExpenseHandler=async(id)=>{
    try{
      await axios.delete(`https://expensetrackerdata-591b9-default-rtdb.firebaseio.com/expenses/${id}.json`)
      setExpenses((prevState)=>{
        const updatedexpenses=prevState.filter((ele)=>ele.id!==id)
        return updatedexpenses;
      })
      console.log('Expense Successfully Deleted')
    }catch(error){
      console.log(error)
    }
  };

  const editExpenseHandler=async(details)=>{

    try{
      await axios.put("https://expensetrackerdata-591b9-default-rtdb.firebaseio.com/expenses/id.json")
    }catch(error){
      console.log(error)
    }
  }

  const expenseContext = {
    expenses: expenses,
    totalAmount: totalAmount,
    addExpense: addExpenseHandler,
    removeExpense:removeExpenseHandler,
    editExpense:editExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
