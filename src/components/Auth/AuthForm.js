import React, { useRef, useState } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import axios from "axios";

const AuthForm = () => {

    const [error,setError]=useState(null)

    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    const confirmPasswordInputRef=useRef();

    const submitHandler=async (event)=>{
        event.preventDefault();
        const enteredEmail=emailInputRef.current.value;
        const enteredPassword=passwordInputRef.current.value;
        const enteredConfirmPassword=confirmPasswordInputRef.current.value;
        if(enteredPassword===enteredConfirmPassword){
            try{
                await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4GjTK67EiRG4F6h_wEsd1uUdZeP_sYvw',{
                    email:enteredEmail,
                    password:enteredConfirmPassword,
                    returnSecureToken:true
                })
                console.log('User has successfully sigend up.')
            }catch(error){
                setError(error.response.data.error.message)
            }

        }else{
            setError('Password is not matched')
        }
    }



  return (
    <React.Fragment>
      <Card
        style={{
          width: "20rem",
          height: "20rem",
          margin: "auto",
          marginTop: "10vh",
        }}
      >
        <Card.Body>
          <Card.Title style={{ color: "black", textAlign: "center" }}>
            Sign Up
          </Card.Title>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-4 mt-4">
                <Form.Control type="email" placeholder="Email" required ref={emailInputRef} />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control type="text" placeholder="Password" required ref={passwordInputRef} />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  required
                  ref={confirmPasswordInputRef}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </Form>
        </Card.Body>
      </Card>
      <Container
        style={{
          width: "20rem",
          margin: "auto",
          marginTop: "2vh",
          border: "2px solid black",
          borderRadius: "5px",
          backgroundColor: "#6c766c",
          textAlign: "center",
        }}
      >
        {!error ? <span>Have an account? Login</span> : <span>{error}</span>}
      </Container>
    </React.Fragment>
  );
};

export default AuthForm;
