import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import ReactCSSTransitionGroup from "react-transition-group";
import axios from "axios";
import { DATA_URL } from "../../index";
import Swal from "sweetalert2";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";

import "./login-signup.styles.css";

const LoginSignUp = (props) => {
  const history = useHistory();
  const [cookie, setCookie] = useCookies();
  // State to show signup form if true
  // console.log(props.location.state.signUp);
  const [signUpShow, setSignUpShow] = useState(null);
  // States to save the user details
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setConfirmUserPassword] = useState("");
  // States to get login info
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Load SignUp or Login page on mounting
  useEffect(() => {
    checkValidToken();
    if (
      props.location.state.signUp === undefined ||
      props.location.state.signUp === true
    ) {
      setSignUpShow(true);
    } else {
      setSignUpShow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if the token is valid, redirect to HomePage
  const checkValidToken = async () => {
    try {
      const response = await axios.get(
        `${DATA_URL}/playlist/api/user/get-data`,
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      if (response.status === 200) {
        if (response.data.auth === true) {
          // Redirect to Homepage
          history.push({
            pathname: "/",
            search: "?user=authorized",
          });
        }
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      } else {
        console.log(err);
      }
    }
  };

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
    try {
      const response = await axios.post(
        `${DATA_URL}/playlist/api/user/sign-up`,
        {
          name: userName,
          email: userEmail,
          password: userPassword,
        }
      );
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "You have been successfully signed up.",
        });
        history.push("/");
        return;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: response.data.message,
        });
        return;
      }
    } catch (error) {
      // console.log(error);
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Something went wrong.",
        });
      }
    }
  };
  // handleCreateUser to submit room data when create Room button is clicked
  const handleCreateUser = (e) => {
    e.preventDefault();
    // createUser();
    if (validateCreateUser()) {
      createUser();
    }
  };

  // Validation for login details
  const validateLoginUser = () => {
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
  const loginUser = async () => {
    try {
      const response = await axios.post(`${DATA_URL}/playlist/api/user/login`, {
        email: loginEmail,
        password: loginPassword,
        rememberMe: rememberMe,
      });
      // console.log(response);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "You have successfully logged in to your account.",
        });
        setCookie("playlist_token", response.data.token);
        history.push({
          pathname: "/",
          search: "?login=success",
          state: {
            message: "You have successfully logged in to your account.",
          },
        });
        // history.push("/");
        return;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: response.data.message,
        });
        return;
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response);
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Something went wrong.",
        });
      }
    }
  };
  // handleGetUser to submit and login
  const handleLoginUser = (e) => {
    e.preventDefault();
    // getUser();
    if (validateLoginUser()) {
      loginUser();
    }
  };

  return (
    <main classname="p-0 m-0">
      <Row md={2} xs={1} style={{ minHeight: "100vh" }}>
        <Col className='bg-warning d-flex flex-column justify-content-center align-items-center form-divcolumnsignup'>
          <div
            className={`${
              signUpShow ? "d-flex" : "d-none"
            } flex-column w-100 m-4 p-5 form-space`}
          >
            <h3>SignUp Form</h3>
            <Form.Group className='mb-2'>
              <Form.Label>Enter your Name</Form.Label>
              <Form.Control
                type='text'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className='mb-2'>
              <Form.Label>Choose a your Username</Form.Label>
              <Form.Control
                type='text'
                // value={userName}
                // onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group> */}
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
          <div
            className={`${
              signUpShow ? "d-none" : "d-flex"
            } flex-column text-center m-4 p-5 form-space`}
          >
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
        </Col>
        <Col className='bg-light d-flex flex-column justify-content-center align-items-center form-divcolumnslogin'>
          <div
            className={`${
              signUpShow ? "d-none" : "d-flex"
            } flex-column w-100 m-4 p-5 form-space`}
          >
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
            <Form.Group className='mb-2 d-flex'>
              <Form.Check
                type='checkbox'
                value={rememberMe}
                onChange={(e) => setRememberMe(!rememberMe)}
              />
              <Form.Label className='ms-2'>Remember Me</Form.Label>
            </Form.Group>
            <Form.Group className='mb-2'>
              <Button className='rounded-pill' onClick={handleLoginUser}>
                Login
              </Button>
              <p className='mt-4'>
                <Link to='/forgot-password'>
                  <span className='text-primary'>Forgot Password?</span>
                </Link>
                .
              </p>
            </Form.Group>
          </div>
          <div
            className={`${
              signUpShow ? "d-flex" : "d-none"
            } flex-column text-center m-4 p-5 form-space`}
          >
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
        </Col>
      </Row>
    </main>
  );
};

export default LoginSignUp;
