import React, { useState } from "react";
import "./join-room.styles.css";
import MainHeaderDiv from "../../components/layouts/MainHeaderDiv/MainHeaderDiv";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";

const JoinRoom = () => {
  const [viewPassword, setViewPassword] = useState(false);
  return (
    <div className='main-container'>
      <MainHeaderDiv title='Create Room' routeName='CreateRoom' />
      <div className='join-room-div'>
        <Container className='pb-1' fluid>
          <Row>
            <Col xs={12} sm={6} md={8} lg={9}>
              <h1>Join Room</h1>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              <Button size='lg' style={{ width: "100%" }}>
                HOW TO PLAY
              </Button>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col xs={12} md={9}>
              <Row className='py-2'>
                <Form.Label>Room ID:</Form.Label>
                <Col xs={12} md={8} className='py-1'>
                  <Form.Control type='text' />
                </Col>
                <Col xs={12} md={4} className='py-1'>
                  <Button style={{ width: "100%" }}>Check Server</Button>
                </Col>
              </Row>
              <Row className='py-2'>
                <Form.Label> Passcode: </Form.Label>
                <Col xs={12} md={8} className='py-1'>
                  <Form.Control
                    type={`${viewPassword ? "text" : "password"}`}
                  />
                </Col>
                <Col xs={12} md={4} className='py-1'>
                  <Button
                    style={{ fontSize: "20px", width: "100%" }}
                    onClick={() => setViewPassword(!viewPassword)}
                  >
                    {viewPassword ? <IoIosEyeOff /> : <IoMdEye />}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='d-flex justify-content-center my-1 py-4'>
            <Col xs={12} sm={6} md={4} lg={3}>
              <Button size='lg' className='mt-5' style={{ width: "100%" }}>
                JOIN ROOM
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default JoinRoom;
