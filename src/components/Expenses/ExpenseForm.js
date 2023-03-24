import React, { useRef, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ExpenseList from "./ExpenseList";
import axios from "axios";
import { expenseActions } from "../../store/expense-slice";

const ExpenseForm = (props) => {
  const [isEdit, setIsEdit] = useState(null);
  const desInputRef = useRef();
  const amountInputRef = useRef();
  const catInputRef = useRef();

  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredDes = desInputRef.current.value;
    const enteredCat = catInputRef.current.value;

    const expenseDetails = {
      amount: enteredAmount,
      description: enteredDes,
      category: enteredCat,
    };
    const email = localStorage.getItem("email");
    const newEmail = email.replace("@", "").replace(".", "").replace(".", "");
    if (isEdit === null) {
      try {
        const response = await axios.post(
          `https://expensetrackerdata-591b9-default-rtdb.firebaseio.com/${newEmail}.json`,
          { expenseDetails }
        );
        const updatedExpense = {
          ...expenseDetails,
          id: response.data.name,
        };
        dispatch(
          expenseActions.addExpense({
            expense: updatedExpense,
            amount: updatedExpense.amount,
          })
        );
        amountInputRef.current.value = "";
        desInputRef.current.value = "";
        catInputRef.current.value = "";
      } catch (error) {
        console.log(error);
      }
    } else {
      const id = isEdit.id;
      const amount = isEdit.amount;
      try {
        await axios.put(
          `https://expensetrackerdata-591b9-default-rtdb.firebaseio.com/${newEmail}/${id}.json`,
          { expenseDetails }
        );
        const existingExpenseIndex = expenses.findIndex((ele) => ele.id === id);
        const updatedexpenses = [...expenses];
        const updatedexpense = {
          ...expenseDetails,
          id: id,
        };
        updatedexpenses[existingExpenseIndex] = updatedexpense;
        const removeAmount = Math.abs(amount - updatedexpense.amount);
        dispatch(
          expenseActions.editExpense({
            expenses: updatedexpenses,
            amount: removeAmount,
          })
        );
        amountInputRef.current.value = "";
        desInputRef.current.value = "";
        catInputRef.current.value = "";
        setIsEdit(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editExpenseHandler = (expense) => {
    console.log(expense);
    amountInputRef.current.value = expense.amount;
    desInputRef.current.value = expense.description;
    catInputRef.current.value = expense.category;
    setIsEdit({ id: expense.id, amount: expense.amount });
  };

  return (
    <Container>
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
          <Form.Control
            type="text"
            placeholder="Description"
            ref={desInputRef}
          />
        </Form.Group>
        <Form.Select className="mb-3" ref={catInputRef}>
          <option>Choose Category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
        </Form.Select>
        <div className="d-grid gap-2">
          <Button type="submit" variant="primary" size="lg">
            {!isEdit ? "Add Expense" : "Edit Expense"}
          </Button>
        </div>
      </Form>
      <ExpenseList onClick={editExpenseHandler} />
    </Container>
  );
};

export default ExpenseForm;
