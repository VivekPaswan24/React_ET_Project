import React, { useContext } from "react";
import { Card, ListGroup } from "react-bootstrap";
import ExpenseContext from "../../store/expense-context";
import NewExpense from "./NewExpense";
const ExpenseList = (props) => {
  const expenseCtx = useContext(ExpenseContext);
  return (
    <Card border="info" className="mt-5">
      <Card.Header>Expense List</Card.Header>
      <Card.Body>
        <ListGroup as="ol" numbered>
          {expenseCtx.expenses.map((ele) => (
            <NewExpense
              id={ele.id}
              key={ele.id}
              category={ele.category}
              description={ele.description}
              amount={ele.amount}
              onClick={props.onClick}
            />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ExpenseList;
