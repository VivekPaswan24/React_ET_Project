import axios from "axios";
import React from "react";
import { Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Expenses from "../components/Expenses/Expenses";

import classes from "./Welcome.module.css";

const WelcomePage = () => {
    const varifyEmailHandler=async()=>{
        const token=localStorage.getItem('token')
        try{
           const response= await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD4GjTK67EiRG4F6h_wEsd1uUdZeP_sYvw',{
                requestType:'VERIFY_EMAIL',
                idToken:token
            })
            console.log(response)
            alert('A verification link has been send to your mail id')
        }catch(error){
            alert(error.response.data.error.message)
        }
    }
  return (
    <>
      <Container fluid className={classes.msg}>
        <p>Welcome to expense tracker!!!</p>
        <Button variant="outline-success" onClick={varifyEmailHandler} className='mb-3'>Verify Email</Button>
        <p>
          Your profile is incomplete.
          <NavLink to="/updateProfile">Complete Now</NavLink>
        </p>
      </Container>
      <Container className="mt-5">
        <h2 style={{textAlign:'center'}}>Daily Expenses</h2>
        <Expenses/>
      </Container>
    </>
  );
};

export default WelcomePage;
