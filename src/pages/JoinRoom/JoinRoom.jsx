import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AvatarIcon from "../../components/AvatarIcon/AvatarIcon";
import MainHeaderDiv from "../../components/MainHeaderDiv/MainHeaderDiv";

import "./join-room.styles.css";

const JoinRoom = () => {
  return (
    <div className='main-container'>
      <MainHeaderDiv title='Exit Room' routeName='Home' />
      <div className='p-5 d-flex flex-column align-items-center' fluid>
        {/* <Container className='p-4' style={{ backgroundColor: "red" }} fluid> */}
        <Row sm={2} xs={1} className=' d-flex align-items-center'>
          <div>
            <AvatarIcon imageUrl='https://robohash.org/9?set=set2' />
          </div>
          <div>
            <Button size='lg' style={{ height: "50px", width: "180px" }}>
              HOW TO PLAY
            </Button>
          </div>
        </Row>
        <Container className='p-4' style={{ backgroundColor: "red" }}>
          <Row sm={2} xs={1}>
            <Col>
              <h1>Create Room</h1>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default JoinRoom;
