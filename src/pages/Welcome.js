import axios from "axios";
import React from "react";
import { Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

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
        <p>
          Your profile is incomplete.
          <NavLink to="/updateProfile">Complete Now</NavLink>
        </p>
      </Container>
      <Container className="mt-5">
        <Button onClick={varifyEmailHandler}>Verify Email</Button>
      </Container>
    </>
  );
};

export default WelcomePage;
