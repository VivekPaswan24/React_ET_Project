import React from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import classes from './Welcome.module.css'

const WelcomePage=()=>{

    return <Container fluid className={classes.msg}>
        <p>Welcome to expense tracker!!!</p>
        <p>Your profile is incomplete.<NavLink to='/updateProfile'>Complete Now</NavLink></p>
    </Container>
};

export default WelcomePage;