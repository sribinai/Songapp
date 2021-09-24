import React, { useState, useEffect, useRef } from "react";
import MainHeaderDiv from "../../components/MainHeaderDiv/MainHeaderDiv";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaCopy } from "react-icons/fa";

import {
  createRoomCode,
  createRandomPassCode,
} from "../../functionalities/createPage.function";
import "./create-room.styles.css";

const CreateRoom = () => {
  const [roomID, setRoomID] = useState("THXQL");
  const [roomName, setRoomName] = useState("");
  const [passCode, setPassCode] = useState("");
  const [noOfPlayers, setNoOfPlayers] = useState(1);
  const [gameRules, setGameRules] = useState("");

  const refPassInput = useRef(null);

  useEffect(() => {
    // console.log("runs during mount");
    setRoomID(createRoomCode());
  }, []);

  const copyPassCode = () => {
    refPassInput.current.select();
    navigator.clipboard.writeText(refPassInput.current.defaultValue);
  };
  const copyRoomID = () => {
    navigator.clipboard.writeText(roomID);
  };

  return (
    <div className='main-container'>
      <MainHeaderDiv title='Join Room' routeName='/joinRoom' />
      <div className='create-room-div'>
        <Container fluid>
          <Row xs={1} sm={2}>
            <Col>
              <h1>Create Room</h1>
            </Col>
            <Col className='d-flex justify-content-end'>
              <Button size='lg' className='create-room-button'>
                ROOM ID: {roomID} <FaCopy onClick={copyRoomID} />
              </Button>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row xs={1} md={2}>
            <Col>
              <div className='input-div'>
                <Form.Label size='lg'>Room Name:</Form.Label>
                <Form.Group as={Col} className='text-div'>
                  <Form.Control
                    type='text'
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                  <Button>SAVE</Button>
                </Form.Group>
              </div>

              <div className='input-div'>
                <Form.Label> Passcode: </Form.Label>
                <Form.Group as={Col} className='text-div'>
                  <Form.Control
                    ref={refPassInput}
                    type='text'
                    value={passCode}
                    onChange={(e) => setPassCode(e.target.value)}
                  />
                  <Button onClick={copyPassCode}>
                    <FaCopy />
                  </Button>
                </Form.Group>
              </div>

              <div className='input-div'>
                <Button onClick={() => setPassCode(createRandomPassCode())}>
                  GENERATE PASSCODE
                </Button>
              </div>
            </Col>
            <Col>
              <div className='input-div'>
                <Form.Label>Number of Participants</Form.Label>
                <Form.Select
                  value={noOfPlayers}
                  onChange={(e) => setNoOfPlayers(e.target.value)}
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                </Form.Select>
              </div>

              <div className='input-div'>
                <Form.Label className='title'>Game Rules</Form.Label>
                <Form.Control
                  as='textarea'
                  value={gameRules}
                  onChange={(e) => setGameRules(e.target.value)}
                  style={{ height: "100px" }}
                />
              </div>
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
