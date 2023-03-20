import React from "react";

import { Navbar,Container } from "react-bootstrap";

const MainNavigation = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
