
import MyVerticallyCenteredModal from "../../components/PlayInstructions/PlayInstructions";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
// import waves from "../../images/music_waves.png";
import waves from "../../images/waves.png";
import { Container, Row, Col, Image } from "react-bootstrap";

import "./footer.styles.css";


const FooterComponent = () => {
  const [modalShow, setModalShow] = React.useState(false);

  
  return (
    <Container className='footer-div' fluid>
      <Row>
        <Col className='footer-content' onClick={() => setModalShow(true)}>
        <div className="d-flex align-items-center justify-content-center">
        
          How to Play
       
        <span className='arrow-symbol'>&#129046;</span>
        
        
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}></MyVerticallyCenteredModal>

       
        </Col>
      </Row>
      <Image className='footer-image' src={waves} alt='music waves' />
      
    </Container>
  );
};


export default FooterComponent;
