import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NewExpense from "./NewExpense";
import { expenseActions } from "../../store/expense-slice";
import axios from "axios";

const ExpenseList = (props) => {
  const expenses = useSelector((state) => state.expense.expenses);
  const totalAmount = useSelector((state) => state.expense.totalAmount);

  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const newEmail = email.replace("@", "").replace(".", "").replace(".", "");

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `https://expensetrackerdata-591b9-default-rtdb.firebaseio.com/${newEmail}.json`
        );
        const data = response.data;
        console.log(data);
        const loadedExpenses = [];
        let totalAmount = 0;
        for (const key in data) {
          loadedExpenses.push({
            id: key,
            amount: data[key].expenseDetails.amount,
            category: data[key].expenseDetails.category,
            description: data[key].expenseDetails.description,
          });
          totalAmount = +totalAmount + Number(data[key].expenseDetails.amount);
        }
        console.log(totalAmount);
        dispatch(
          expenseActions.replaceExpenses({
            expenses: loadedExpenses,
            amount: totalAmount,
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [dispatch, newEmail]);

  return (
    <Card border="info" className="mt-5">
      <Card.Header className="d-flex justify-content-between">
        <div>
          <p className="fw-bold">
        Expense List
          </p>
        </div>
        <div>
          <p className="fw-bold">{`Total Amount: ${totalAmount} Rs`}</p>
        </div>
      </Card.Header>

      <Card.Body>
        <ListGroup as="ol" numbered>
          {expenses.map((ele) => (
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
