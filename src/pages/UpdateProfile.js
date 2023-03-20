import axios from "axios";
import React, { useRef } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const UpdatProfilePage = () => {

    const nameInputRef=useRef();
    const photoInputRef=useRef();

    const updateProfileHandler=async(event)=>{
        event.preventDefault()
        const enteredName=nameInputRef.current.value
        const enteredPhoto=photoInputRef.current.value
        const token=localStorage.getItem('token')

        try{
            const response= await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD4GjTK67EiRG4F6h_wEsd1uUdZeP_sYvw',{
                idToken:token,
                displayName:enteredName,
                photoUrl:enteredPhoto,
                returnSecureToken:true
            })
            console.log(response)
            alert('Done')
        }catch(error){
            console.log(error)
        }
    }
  return (
    <Container className="mt-5">
      <Form onSubmit={updateProfileHandler}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Full Name
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Full Name" ref={nameInputRef} required/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Profile Photo URL
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Profile Photo URL" ref={photoInputRef} required />
          </Col>
        </Form.Group>
        <Button type="submit">Update</Button>
      </Form>
    </Container>
  );
};

export default UpdatProfilePage;