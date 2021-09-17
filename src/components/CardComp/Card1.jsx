import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

function Card2() {
  return (
    <Card
      style={{
        width: "23rem",
        height: "300px",
        color: "white",
        backgroundColor: "#29539b",
        backgroundImage: "linear-gradient(315deg, #29539b 0%, #1e3b70 74%)",
        position: "absolute",
        right: "150px",
        top: "140px",
      }}
    >
      <Card.Body>
        <Card.Title style={{ fontSize: "40px", fontWeight: "bold" }}>
          Join Room
        </Card.Title>
        <Card.Text
          style={{
            fontFamily: "monospace",
            paddingTop: "10%",
            fontSize: "30px",
          }}
        >
          Play along with your friends
        </Card.Text>
        <Card.Text style={{ fontSize: "80px" }}>&#x2192;</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Card2;
