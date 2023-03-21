import React, { useContext } from "react";
import { Card,ListGroup } from "react-bootstrap";
import ExpenseContext from "../../store/expense-context";
import NewExpense from "./NewExpense";
const ExpenseList = () => {

    const expenseCtx=useContext(ExpenseContext);
  return (
    <Card border="info" className="mt-5">
      <Card.Header>Expense List</Card.Header>
      <Card.Body>
      <ListGroup as="ol" numbered>
        {expenseCtx.expenses.map((ele)=> <NewExpense key={Math.random().toFixed(4)} cat={ele.category} des={ele.description} amount={ele.amount} />)}
      </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ExpenseList;
