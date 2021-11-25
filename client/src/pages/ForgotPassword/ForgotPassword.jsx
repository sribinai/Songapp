import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./ForgotPassword-Style.css";

const ForgotPassword = () => {
    return(
        <Container fluid className="main-box">
        <div style={{justifyContent:'center'}}>
            <h3>Forgot Password</h3>
            <Form.Group className='mb-2'>
              <Form.Label>Enter your EmailID</Form.Label>
              <Form.Control
                type='email'
              />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Enter your new password</Form.Label>
              <Form.Control
                type='password'
              />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Confirm your password</Form.Label>
              <Form.Control
                type='password'
              />
            </Form.Group>
            <Form.Group className='mb-2'>
            <Link to='/'>
              <Button className='rounded-pill' >
                Submit
                
              
              </Button></Link>
            </Form.Group>
        </div>  

        </Container>
    );
};
export default ForgotPassword;