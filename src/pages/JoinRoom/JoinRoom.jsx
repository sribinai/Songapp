import React, { useState } from "react";
import "./join-room.styles.css";
import MainHeaderDiv from "../../components/MainHeaderDiv/MainHeaderDiv";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";

const JoinRoom = () => {
  const [viewPassword, setViewPassword] = useState(false);
  return (
    <div className='main-container'>
      <MainHeaderDiv title='Create Room' routeName='CreateRoom' />
      <div className='join-room-div'>
        <Container fluid>
          <Row xs={1} sm={2}>
            <Col>
              <h1>Join Room</h1>
            </Col>
            <Col className='d-flex justify-content-end'>
              <Button size='lg' className='join-room-button'>
                HOW TO PLAY
              </Button>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row xs={1} md={2}>
            <Col>
              <div className='input-div'>
                <Form.Label>Room ID:</Form.Label>
                <Form.Group as={Col} className='text-div'>
                  <Form.Control type='text' />
                  <Button>Check Server</Button>
                </Form.Group>
              </div>

              <div className='input-div'>
                <Form.Label> Passcode: </Form.Label>
                <Form.Group as={Col} className='text-div'>
                  <Form.Control
                    type={`${viewPassword ? "text" : "password"}`}
                  />
                  <Button
                    style={{ fontSize: "20px" }}
                    onClick={() => setViewPassword(!viewPassword)}
                  >
                    {viewPassword ? <IoIosEyeOff /> : <IoMdEye />}
                  </Button>
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Container>
        <div className='join-room-button-div'>
          <Button className='join-room-button' size='lg' variant='primary'>
            JOIN ROOM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
