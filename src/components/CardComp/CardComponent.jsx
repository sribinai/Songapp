import React from "react";
import { Card } from "react-bootstrap";

import "./card.styles.css";

function CardComponent({ cardHeading }) {
  return (
    <Card className='card-container'>
      <Card.Body>
        <Card.Title className='card-heading' style={{ fontSize: "40px" }}>
          {cardHeading}
        </Card.Title>
        <Card.Text className='card-text'>
          Play along with your friends
        </Card.Text>
        <Card.Text className='card-arrow-symbol'>&#129046;</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
