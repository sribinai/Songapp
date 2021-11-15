import React from "react";
import logo from "../../images/PMPL-LOGO.png";
import { Container, Row, Col, Image } from "react-bootstrap";

import "./header.styles.css";

function HeaderDiv({ headerText }) {
  return (
    <Container className='d-flex flex-column justify-content-center align-items-center text-center mt-2 mb-4'>
      <Row className='d-flex justify-content-center align-items-center my-1'>
        <Image
          src={logo}
          alt='Logo'
          style={{ minWidth: "100px", maxWidth: "300px", marginBottom: "10px" }}
        />
      </Row>
      <Row className='hr-line' />
      <Row className='heading-content'>
        <Col>{headerText}</Col>
      </Row>
    </Container>
  );
}

export default HeaderDiv;
