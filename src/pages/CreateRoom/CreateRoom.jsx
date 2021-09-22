import React from "react";
import Participants from "../../components/Form/Participants";
import Textarea from "../../components/Form/Textarea";
import MainHeaderDiv from "../../components/MainHeaderDiv/MainHeaderDiv";
import { Container, Row, Col, Button } from "react-bootstrap";

import "./create-room.styles.css";

const CreateRoom = () => {
  return (
    <div className='main-container'>
      <MainHeaderDiv title='Join Room' routeName='Home' />
      <div className='create-room-div'>
        <Container fluid>
          <Row sm={2} xs={1}>
            <Col>
              <h1>Create Room</h1>
            </Col>
            <Col className='d-flex justify-content-end'>
              <Button size='lg' className='create-room-button'>
                ROOM ID: THXQL &#128464;
              </Button>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row xs={1} md={2}>
            <Col>
              <div className='input-div'>
                <h3>Room Name:</h3>
                <div className='text-div'>
                  <input type='text' />
                  <Button>SAVE</Button>
                </div>
              </div>

              <div className='input-div'>
                <h3> Passcode: </h3>
                <div className='text-div'>
                  <input type='text' />
                  <Button>&#128464;</Button>
                </div>
              </div>

              <div className='input-div'>
                <Button>GENERATE PASSCODE</Button>
              </div>
            </Col>
            <Col>
              <Participants title='Number of Participants' />
              <Textarea title='Game Rules' />
            </Col>
          </Row>
        </Container>
        <div className='create-room-button-div'>
          <Button className='create-room-button' size='lg' variant='primary'>
            CREATE ROOM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
