import React from "react";
// import waves from "../../images/music_waves.png";
import waves from "../../images/waves.png";
import { Container, Row, Col, Image } from "react-bootstrap";

import "./footer.styles.css";

const FooterComponent = () => {
  return (
    <Container className='footer-div' fluid>
      <Row>
        <Col className='footer-content'>
          How to Play<span className='arrow-symbol'>&#129046;</span>
        </Col>
      </Row>
      <Image className='footer-image' src={waves} alt='music waves' />
    </Container>
  );
};

export default FooterComponent;
