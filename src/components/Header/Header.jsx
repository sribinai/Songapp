import React from "react";
import logo from "../../images/PMPL-LOGO.png";
import { Container, Row, Col, Image } from "react-bootstrap";

import "./header.styles.css";

function HeaderDiv({ headerText }) {
  return (
    <Container className='header'>
      <Row className='heading-text'>
        <Image
          src={logo}
          alt='Logo'
          style={{ minWidth: "100px", maxWidth: "300px", marginBottom: "20px" }}
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
