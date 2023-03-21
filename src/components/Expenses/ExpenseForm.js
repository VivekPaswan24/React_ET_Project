import React, { useContext, useRef } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import ExpenseContext from "../../store/expense-context";

const ExpenseForm = () => {
  const desInputRef=useRef();
  const amountInputRef=useRef();
  const catInputRef=useRef();

  const expenseCtx=useContext(ExpenseContext);

  const submitHandler=(event)=>{
    event.preventDefault();

    const enteredAmount=amountInputRef.current.value;
    const enteredDes=desInputRef.current.value;
    const enteredCat=catInputRef.current.value;

    const expenseDetails={
      amount:enteredAmount,
      description:enteredDes,
      category:enteredCat
    }

    expenseCtx.addExpense(expenseDetails);

  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mt-3">
        <Form.Label>Expense Amount</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>Rs</InputGroup.Text>
          <Form.Control type="number" ref={amountInputRef} />
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" ref={desInputRef} />
      </Form.Group>
      <Form.Select className="mb-3" ref={catInputRef}>
        <option>Choose Category</option>
        <option value="Food">Food</option>
        <option value="Petrol">Petrol</option>
        <option value="Salary">Salary</option>
      </Form.Select>
      <div className="d-grid gap-2">
      <Button  type="submit" variant="primary" size="lg">
        Add Expense
      </Button>
    </div>
    </Form>
  );
};

export default ExpenseForm;
