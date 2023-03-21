import React from "react";
import { ListGroup } from "react-bootstrap";

const NewExpense = (props) => {
  return (
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{props.cat}</div>
          {props.des}
        </div>
        <div>{`Amount: ${props.amount} Rs`}</div>
      </ListGroup.Item>
  );
};

export default NewExpense;
