import { Button } from "react-bootstrap";
import React from "react";

import { Navbar,Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MainNavigation = () => {
  const token =localStorage.getItem('token')

  const navigate=useNavigate();

  const logoutHandler=()=>{
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
        {token && <Button variant="outline-dark" onClick={logoutHandler} >Logout</Button>}
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
