import "./App.css";
import { Container } from "react-bootstrap";
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
      <FooterComponent />
    </Container>
  );
}

export default App;
