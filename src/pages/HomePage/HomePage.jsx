import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeaderDiv from "../../components/Header/Header";
import FooterComponent from "../../components/Footer/FooterComponent";
import CardComponent from "../../components/CardComp/CardComponent";

import "./homepage.styles.css";

const HomePage = () => {
  return (
    <div className='main-container'>
      <Container>
        <Row>
          <Col>
            <HeaderDiv
              headerText='A multiplayer Social Game to play along with your friends in a private
          room.'
            />
          </Col>
        </Row>
        <Row xs={1} lg={2} className='card-main-div'>
          <Col className='card-div'>
            <CardComponent cardHeading='Create Room' />
          </Col>
          <Col className='card-div'>
            <CardComponent cardHeading='Join Room' />
          </Col>
        </Row>
      </Container>
      <FooterComponent />
    </div>
  );
};

export default HomePage;
