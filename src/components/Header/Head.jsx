import React from "react";
import { Container, Row } from "react-bootstrap";

import "./head.styles.css";

function Head({ title, headerText }) {
  return (
    <Container className='header'>
      <Row className='heading-text'>{title}</Row>
      <Row className='hr-line' />
      <Row className='heading-content'>{headerText}</Row>
    </Container>
  );
}

export default Head;
