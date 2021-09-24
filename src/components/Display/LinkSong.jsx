import React from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  InputGroup,
} from "react-bootstrap";
import { FaPlay } from "react-icons/fa";
import { HiOutlineCloudUpload } from "react-icons/hi";

import "./linksong.style.css";

const LinkSong = () => {
  return (
    <div className='ls'>
      <Container>
        <Row>
          <Col className='d-flex flex-column'>
            <Form.Group as={Col}>
              <Form.Label className='ls-title'>
                Add your songs here....
              </Form.Label>
              <InputGroup>
                <Form.Control type='url' placeholder='Paste link here' />
                <HiOutlineCloudUpload style={{ fontSize: "24px" }} />
                {/* <FaCloudUploadAlt /> */}
                <Button className='btn-light'>ADD</Button>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group as={Col} style={{ position: "relative" }}>
              <Image
                src='https://robohash.org/20?set=set2'
                height='30px'
                width='30px'
                style={{
                  position: "absolute",
                  left: "4px",
                  top: "0",
                  zIndex: "4",
                }}
              />
              <InputGroup>
                <Form.Control
                  type='text'
                  value='Songs Title'
                  style={{ paddingLeft: "40px" }}
                  disabled
                />
                <FaPlay />
                {/* <Form.Control type='file' multiple /> */}
                <Button className='btn-light'>REMOVE</Button>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <button className='start-game'>START GAME</button>
    </div>
  );
};

export default LinkSong;
