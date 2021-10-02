import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import AvatarIcon from "../../components/AvatarIcon/AvatarIcon";
import MainHeaderDiv from "../../components/layouts/MainHeaderDiv/MainHeaderDiv";
import { FaPlay, FaCloudUploadAlt } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

import "./player-dashboard.styles.css";

const PlayerDashboard = () => {
  return (
    <div className='main-container'>
      <MainHeaderDiv title='Exit Room' routeName='Home' />
      <div className='px-5 py-3 d-flex flex-column align-items-center'>
        <div
          className='d-flex justify-content-between align-items-center'
          style={{ width: "100%" }}
        >
          <div>
            <AvatarIcon imageUrl='https://robohash.org/9?set=set2' />
          </div>
          <div>
            <Button size='lg' style={{ height: "50px", width: "180px" }}>
              HOW TO PLAY
            </Button>
          </div>
        </div>
        <Container
          className='p-4'
          style={{ backgroundColor: "rgb(255, 210, 210)", minHeight: "200px", borderRadius: "5px" }}
        >
          <div className='profile-icons-div'>
            <AvatarIcon
              imageUrl='https://robohash.org/10?set=set2'
              statusDetails={true}
              showStatus={true}
            />
            <AvatarIcon
              imageUrl='https://robohash.org/11?set=set2'
              statusDetails={false}
              showStatus={true}
            />
            <AvatarIcon
              imageUrl='https://robohash.org/12?set=set2'
              statusDetails={true}
              showStatus={true}
            />
            <AvatarIcon
              imageUrl='https://robohash.org/13?set=set2'
              statusDetails={false}
              showStatus={true}
            />
            <AvatarIcon
              imageUrl='https://robohash.org/14?set=set2'
              statusDetails={false}
              showStatus={true}
            />
            <AvatarIcon
              imageUrl='https://robohash.org/15?set=set2'
              statusDetails={true}
              showStatus={true}
            />
            <AvatarIcon
              imageUrl='https://robohash.org/16?set=set2'
              statusDetails={true}
              showStatus={true}
            />
          </div>
        </Container>
      </div>
      <div className='add-songs-div'>
        <Container
          className='text-center'
          style={{
            padding: "10px 0",
          }}
        >
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

          <Row xs={1} md={2} className='mb-2 px-4'>
            <Col xs={12} md={10}>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon = {faMusic}
                    height='30px'
                    width='30px'
                  />
                </InputGroup.Text>
                <Form.Control type='url' value='Songs Title' disabled />
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
