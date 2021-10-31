import React, { useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import AvatarIcon from "../../components/AvatarIcon/AvatarIcon";
import MainHeaderDiv from "../../components/layouts/MainHeaderDiv/MainHeaderDiv";
import { FaPlay, FaMusic, FaCloudUploadAlt } from "react-icons/fa";

import "./player-dashboard.styles.css";

const PlayerDashboard = () => {
  const [userID, setUserID] = useState("617d339f9e6c76398283e20d"); // Hardcoded userID for now, will change once login is fixed
  const [roomID, setRoomID] = useState("BPTQXQ"); // Hardcoded roomID for now, will change once login is fixed
  const [guestName, setGuestName] = useState("Godson"); // Hardcoded guestName for now, will change once login is fixed
  return (
    <div className='main-container'>
      <MainHeaderDiv
        title='Exit Room'
        routeName='Home'
        redirectPromt={true}
        promptMessage='Are you sure, you want to leave the room?'
      />
      <div className='px-5 py-3 d-flex flex-column align-items-center'>
        <Container fluid>
          <Row
            className='mb-3 p-2 rounded'
            style={{ backgroundColor: "rgb(200, 200, 200, 0.5)" }}
          >
            <Col lg={9} md={8} sm={7} xs={12} className='d-flex'>
              <AvatarIcon imageUrl='https://robohash.org/36?set=set8' />
              <div className='d-flex flex-column justify-content-center m-2'>
                {/* <h4>Host Name</h4> */}
                <span>RoomID: {roomID}</span>
                <span>Host Name: {guestName}</span>
              </div>
            </Col>
            <Col
              lg={3}
              md={4}
              sm={5}
              xs={12}
              className='d-flex justify-content-center align-items-center'
            >
              <Button
                size='lg'
                style={{ height: "60px", width: "100%", borderRadius: "10px" }}
              >
                Room Rules
              </Button>
            </Col>
          </Row>
        </Container>
        <Container
          className='px-4 py-2'
          style={{
            backgroundColor: "rgb(255, 210, 210)",
            minHeight: "200px",
            borderRadius: "5px",
          }}
        >
          <div className='w-full text-center mb-3'>
            <h3>Waiting Lobby...</h3>
          </div>
          <div className='profile-icons-div'>
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/36?set=set8'
                statusDetails={true}
                showStatus={true}
              />
              <span>{guestName}</span>
              <span>10 songs added</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/46?set=set4'
                statusDetails={false}
                showStatus={true}
              />
              <span>John</span>
              <span>No songs added</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/10?set=set5'
                statusDetails={true}
                showStatus={true}
              />
              <span>Rahul</span>
              <span>10 songs added</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/14?set=set5'
                statusDetails={true}
                showStatus={true}
              />
              <span>Harry</span>
              <span>2 songs added</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/13?set=set24'
                statusDetails={false}
                showStatus={true}
              />
              <span>Yash</span>
              <span>No songs added</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/30?set=set3'
                statusDetails={true}
                showStatus={true}
              />
              <span>Raj</span>
              <span>1 songs added</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/11?set=set4'
                statusDetails={true}
                showStatus={true}
              />
              <span>Raj</span>
              <span>10 songs added</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/25?set=set4'
                statusDetails={true}
                showStatus={true}
              />
              <span>Raj</span>
              <span>10 songs added</span>
            </div>
          </div>
        </Container>
      </div>
      <div className='add-songs-div'>
        <Container className='text-center py-3'>
          <Row className='mb-2'>
            <h3 className='text-white'>Add your songs here....</h3>
          </Row>
          <Row xs={1} md={2} className='mb-2 px-4'>
            <Col xs={12} md={10}>
              <InputGroup>
                <Form.Control type='url' placeholder='Place link here' />
                <InputGroup.Text className='px-1'>
                  <FaCloudUploadAlt
                    style={{ fontSize: "24px", width: "50px" }}
                  />
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Col xs={12} md={2}>
              <Button className='btn-light' style={{ width: "100%" }}>
                ADD
              </Button>
            </Col>
          </Row>

          <Row className='mb-2 px-4'>
            <Col xs={12} md={10}>
              <InputGroup style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    zIndex: "4",
                    left: "3px",
                    top: "3px",
                    height: "33px",
                    width: "35px",
                    overflow: "hidden",
                    backgroundColor: "rgb(250, 100, 100)",
                    boxShadow:
                      "1px 1px 3px rgb(100,100,100), -1px -1px 3px rgb(100,100,100)",
                    border: "2px solid #fff",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                  }}
                >
                  <FaMusic />
                </span>
                <Form.Control
                  type='url'
                  value='Songs Title'
                  style={{ paddingLeft: "50px", borderRadius: "50px 0 0 50px" }}
                  disabled
                />
                <InputGroup.Text className='px-1'>
                  <FaPlay style={{ fontSize: "24px", width: "50px" }} />
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Col xs={12} md={2}>
              <Button className='btn-light' style={{ width: "100%" }}>
                REMOVE
              </Button>
            </Col>
          </Row>
        </Container>
        <button className='start-game-button'>START GAME</button>
      </div>
    </div>
  );
};

export default PlayerDashboard;
