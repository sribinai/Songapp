import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <div className='main-container'>
      <div className='join-room-div'>
        <Container className='pb-1' fluid>
          <div className='text-center'>
            <h2 className='mb-4'>Oops... Page could not found</h2>
            Sorry. Its seems the page you are looking for is not available.
            <br />
            Please{" "}
            <Link to='/'>
              <span className='text-primary'>Click here</span>
            </Link>{" "}
            to go to the HomePage.
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NotFoundPage;
