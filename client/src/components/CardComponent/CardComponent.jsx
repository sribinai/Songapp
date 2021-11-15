import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./card.styles.css";

function CardComponent({ cardHeading, textContent }) {
  return (
    <Card className='card-container text-light my-2'>
      <Card.Body>
        <Card.Title className='card-heading' style={{ fontSize: "40px" }}>
          <Link
            to={`${
              cardHeading === "Create Room"
                ? "/createRoom"
                : cardHeading === "Join Room"
                ? "/joinRoom"
                : "#"
            }`}
          >
            {cardHeading}
          </Link>
        </Card.Title>
        <Card.Text className='card-text'>{textContent}</Card.Text>
        <p>
          Click below to{" "}
          <span
            style={{
              textTransform: "lowercase",
              fontWeight: "600",
              fontStyle: "italic",
            }}
          >
            {cardHeading}
          </span>
        </p>
        <Link
          to={`${
            cardHeading === "Create Room"
              ? "/createRoom"
              : cardHeading === "Join Room"
              ? "/joinRoom"
              : "#"
          }`}
        >
          <Card.Text className='card-arrow-symbol mb-2'>&#129046;</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
