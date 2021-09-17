import "./App.css";
import React from "react";
import { Container } from "react-bootstrap";
import Head from "./components/Header/Head";
import FooterComponent from "./components/Footer/FooterComponent";
import Card1 from "./components/CardComp/Card";
import Card2 from "./components/CardComp/Card1";

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
      <Head
        title='Play My PlayList'
        headerText='A multiplayer Social Game to play along with your friends in a private
        room.'
      />
      <Card1 /> <Card2 />
      
      <FooterComponent />
    </Container>
  );
}

export default App;
