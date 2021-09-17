import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

function Card1() {
  return (
    <Card
      style={{
        width: "23rem",
        height: "300px",
        color: "white",
        backgroundColor: "#29539b",
        backgroundImage: "linear-gradient(315deg, #29539b 0%, #1e3b70 74%)",
        position: "relative",
        left: "210px",
        top: "30px",
      }}
    >
      <Card.Body>
        <Card.Title style={{ fontSize: "40px", fontWeight: "bold" }}>
          Create Room
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

export default Card1;
