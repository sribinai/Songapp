import React from "react";
import "./join-room.styles.css";
import MainHeaderDiv from "../../components/MainHeaderDiv/MainHeaderDiv";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const JoinRoom = () => {
  return (
    <div className='main-container'>
      <h2>Join Room</h2>
      <Container fluid>
          <Row xs={1} md={2}>
            <Col>
              <div className='input-div'>
                <Form.Label size='lg'>Room Id:</Form.Label>
                <Form.Group as={Col} className='text-div'>
                  <Form.Control type='text' />
                  <Button>Check Server</Button>
                </Form.Group>
              </div>
            </Col>
          </Row>
      </Container>

    </div>
  );
};

export default JoinRoom;
