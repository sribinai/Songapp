import React from "react";
import logo from "../../images/PMPL-LOGO.png";
import { Container, Row } from "react-bootstrap";

import "./header.styles.css";

function HeaderDiv({ headerText }) {
  return (
    <Container className='header'>
      <Row className='heading-text'>
        <img
          className='heading-image'
          src={logo}
          alt='Logo'
          style={{ width: "30vw", marginBottom: "10px" }}
        />
      </Row>
      <Row className='hr-line' />
      <Row className='heading-content'>{headerText}</Row>
    </Container>
  );
}

export default HeaderDiv;
