import React, { useRef, useState } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import axios from "axios";

import { useNavigate,Link } from "react-router-dom";

const AuthForm = () => {
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (!isLogin) {
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;
      if (enteredPassword === enteredConfirmPassword) {
        try {
          await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4GjTK67EiRG4F6h_wEsd1uUdZeP_sYvw",
            {
              email: enteredEmail,
              password: enteredConfirmPassword,
              returnSecureToken: true,
            }
          );
          console.log("User has successfully sigend up.");
        } catch (error) {
          setError(error.response.data.error.message);
        }
      } else {
        setError("Password is not matched");
      }
    } else {
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4GjTK67EiRG4F6h_wEsd1uUdZeP_sYvw",
          {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }
        );
        localStorage.setItem("token", response.data.idToken);
        navigate("/welcome");
      } catch (error) {
        setError(error.response.data.error.message);
      }
    }
  };

  return (
    <React.Fragment>
      <Card
        style={{
          width: "20rem",
          margin: "auto",
          marginTop: "10vh",
        }}
      >
        <Card.Body>
          <Card.Title style={{ color: "black", textAlign: "center" }}>
            {!isLogin ? "Sign Up" : "Login"}
          </Card.Title>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-4 mt-4">
              <Form.Control
                type="email"
                placeholder="Email"
                required
                ref={emailInputRef}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type={!isLogin ? "text" : "password"}
                placeholder="Password"
                required
                ref={passwordInputRef}
              />
            </Form.Group>
            {!isLogin && (
              <Form.Group className="mb-4">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  required
                  ref={confirmPasswordInputRef}
                />
              </Form.Group>
            )}
            <Button variant="primary" type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Form>
        </Card.Body>
        <Link to='/forgot' style={{textAlign:'center',textDecoration:'none'}}>Forgot password?</Link>
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
        {!error ? (
          <button
            type="click"
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={switchAuthModeHandler}
          >
            {!isLogin
              ? "Have an account ? Login"
              : "Don't have an account? Sign up"}
          </button>
        ) : (
          <span>{error}</span>
        )}
      </Container>
    </React.Fragment>
  );
};

export default AuthForm;
