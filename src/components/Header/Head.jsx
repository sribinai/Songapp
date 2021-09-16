import React from "react";
import { Container, Row } from "react-bootstrap";

import "./head.styles.css";

function Head({ title, headerText }) {
  return (
    <Container className='header1'>
      <Row>
        <h1>{title}</h1>
      </Row>
      <Row className='hr-line' />
      <Row className='heading-content'>{headerText}</Row>
    </Container>
  );
}

export default Head;
