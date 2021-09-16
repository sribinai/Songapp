import "./App.css";
import React from "react";
import { Container } from "react-bootstrap";
import Head from "./components/Header/Head";
import FooterComponent from "./components/Footer/FooterComponent";

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
      <FooterComponent />
    </Container>
  );
}

export default App;
