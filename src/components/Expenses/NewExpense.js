import React, { useContext } from "react";
import { Button, ListGroup } from "react-bootstrap";
import ExpenseContext from "../../store/expense-context";

const NewExpense = (props) => {

const expenseCtx=useContext(ExpenseContext)
  const editHandler=()=>{
    props.onClick(props)
  }

  const deleteHandler=()=>{
    expenseCtx.removeExpense(props.id)
  }
  return (
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{props.category}</div>
          {props.description}
        </div>
        <div>
        <div className="fw-bold">{`Amount: ${props.amount} Rs`}</div>
        <Button variant="outline-dark" size="sm" className="me-3" onClick={editHandler} >Edit</Button>
        <Button variant="outline-danger" size="sm" onClick={deleteHandler}>Delete</Button>
        </div>
      </ListGroup.Item>
  );
};

export default NewExpense;
