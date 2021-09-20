import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Head from "../../components/Header/Head";
import FooterComponent from "../../components/Footer/FooterComponent";
import CardComponent from "../../components/CardComp/CardComponent";

import "./homepage.styles.css";

const HomePage = () => {
  return (
    <Container className='homepage-container' fluid>
      <Container className='homepage-main-div'>
        <Row>
          <Col>
            <Head
              title='Play My PlayList'
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
    </Container>
  );
};

export default HomePage;
