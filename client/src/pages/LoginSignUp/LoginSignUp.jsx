import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { DATA_URL } from "../../index";
import Swal from "sweetalert2";

const LoginSignUp = () => {
  const [signUpShow, setSignUpShow] = useState(true);

  // States to save the user details
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setConfirmUserPassword] = useState("");

  // States to get login info
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Function for Validation for create user data
  const validateCreateUser = () => {
    let title = "",
      text = "";
    if (userName.length === 0) {
      title = "Name empty";
      text = "User name should not be empty.";
    } else if (userName.length < 3) {
      title = "Name too short";
      text = "Name should be atleast 3 characters long.";
    } else if (userEmail.length === 0) {
      title = "Email empty";
      text = "Email should not be empty.";
    } else if (userPassword.length === 0) {
      title = "Password empty";
      text = "Password should not be empty.";
    } else if (userPassword.length < 6) {
      title = "Password too short";
      text = "Set a secure Password atleast 6 characters long.";
    } else if (userPassword !== confirmUserPassword) {
      title = "Password Mismatch";
      text = "Both passwords do not match.";
    }
    if (title.length !== 0) {
      Swal.fire({
        icon: "error",
        title: title,
        text: text,
      });
      return false;
    } else {
      return true;
    }
  };
  // Function for createUser api call
  const createUser = async () => {
    console.log("create user");
    try {
      const response = await axios.post(
        `${DATA_URL}/playlist/api/user/createUser`,
        {
          name: userName,
          email: userEmail,
          password: userPassword,
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log("success");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // handleCreateUser to submit room data when create Room button is clicked
  const handleCreateUser = (e) => {
    e.preventDefault();
    createUser();
    // if (validateCreateUser()) {
    //   createUser();
    // }
  };

  // Validation for login details
  const validateGetUser = () => {
    let title = "",
      text = "";
    // validate data given by user to login
    if (loginEmail.length === 0) {
      title = "Email empty";
      text = "Email ID should not be empty.";
    } else if (loginPassword.length === 0) {
      title = "Password empty";
      text = "Password should not be empty.";
    }
    if (title.length !== 0) {
      Swal.fire({
        icon: "error",
        title: title,
        text: text,
      });
      return false;
    } else {
      return true;
    }
  };
  // function for login api call
  const getUser = async () => {
    console.log("get User");
  };
  // handleGetUser to submit and login
  const handleGetUser = (e) => {
    e.preventDefault();
    getUser();
    // if (validateGetUser()) {
    //   getUser();
    // }
  };

  return (
    <Container fluid>
      <Row md={2} xs={1}>
        <Col className='bg-warning d-flex flex-column justify-content-center align-items-center'>
          {signUpShow ? (
            <div className='d-flex flex-column w-100 m-4 p-5 rounded'>
              <h3>SignUp Form</h3>
              <Form.Group className='mb-2'>
                <Form.Label>Enter your Name</Form.Label>
                <Form.Control
                  type='text'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>Enter your EmailID</Form.Label>
                <Form.Control
                  type='email'
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>Set up your password</Form.Label>
                <Form.Control
                  type='password'
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>Confirm your password</Form.Label>
                <Form.Control
                  type='password'
                  value={confirmUserPassword}
                  onChange={(e) => setConfirmUserPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Button className='rounded-pill' onClick={handleCreateUser}>
                  Submit Details
                </Button>
              </Form.Group>
            </div>
          ) : (
            <div className='d-flex flex-column text-center m-4 p-5 rounded'>
              <p>Don't have an Account?</p>
              <Button
                className='rounded-pill'
                onClick={() => setSignUpShow(true)}
              >
                Go to SignUp
              </Button>
              <p className='mt-4'>
                Go to{" "}
                <Link to='/'>
                  <span className='text-primary'>HomePage</span>
                </Link>
                .
              </p>
            </div>
          )}
        </Col>
        <Col className='bg-light d-flex flex-column justify-content-center align-items-center'>
          {!signUpShow ? (
            <div className='d-flex flex-column w-100 m-4 p-5 rounded'>
              <h3>Login Form</h3>
              <Form.Group className='mb-2'>
                <Form.Label>Enter your EmailID</Form.Label>
                <Form.Control
                  type='email'
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>Enter your password</Form.Label>
                <Form.Control
                  type='password'
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Button className='rounded-pill' onClick={handleGetUser}>
                  Login
                </Button>
              </Form.Group>
            </div>
          ) : (
            <div className='d-flex flex-column text-center m-4 p-5 rounded'>
              <p>Already have an Account?</p>
              <Button
                className='rounded-pill'
                onClick={() => setSignUpShow(false)}
              >
                Go to Login
              </Button>
              <p className='mt-4'>
                Go to{" "}
                <Link to='/'>
                  <span className='text-primary'>HomePage</span>
                </Link>
                .
              </p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginSignUp;
