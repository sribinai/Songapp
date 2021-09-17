import "./App.css";
import React from "react";
import { Container, Row } from "react-bootstrap";
import Head from "./components/Header/Head";
import FooterComponent from "./components/Footer/FooterComponent";
import CardComponent from "./components/CardComp/Card";
// import Card2 from "./components/CardComp/Card1";

function App() {
  return (
    <Container
      fluid
      style={{
        margin: "0",
        padding: "0",
        minHeight: "100vh",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          aligItems: "center",
          width: "80vw",
        }}
      >
        <Row>
          <Head
            title='Play My PlayList'
            headerText='A multiplayer Social Game to play along with your friends in a private
        room.'
          />
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        >
          <CardComponent cardHeading='Create Room' />
          <CardComponent cardHeading='Join Room' />
        </Row>
      </Container>
      {/* <Card2 /> */}
      <FooterComponent />
    </Container>
  );
}

export default App;
