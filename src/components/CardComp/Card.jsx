import React from "react";
import { Card } from "react-bootstrap";

function CardComponent({ cardHeading }) {
  return (
    <Card
      style={{
        width: "450px",
        minHeight: "300px",
        color: "white",
        boxSizing: "border-box",
        marginBottom: "10px",
        backgroundColor: "#29539b",
        backgroundImage: "linear-gradient(315deg, #29539b 0%, #1e3b70 74%)",
      }}
    >
      <Card.Body>
        <Card.Title style={{ fontSize: "36px", fontWeight: "bold" }}>
          {cardHeading}
        </Card.Title>
        <Card.Text
          style={{
            fontFamily: "monospace",
            paddingTop: "10%",
            fontSize: "26px",
          }}
        >
          Play along with your friends
        </Card.Text>
        <Card.Text style={{ fontSize: "80px" }}>&#x2192;</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
