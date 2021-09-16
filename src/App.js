import "./App.css";
import React from 'react';
import { Container } from "react-bootstrap";
import Head from './components/Head';
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
      <Head/>
      <FooterComponent />
    </Container>
  );
}

export default App;
