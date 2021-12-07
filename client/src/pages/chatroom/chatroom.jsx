import React from "react";
import AvatarIcon from "../../components/AvatarIcon/AvatarIcon";
import "./chatRoom.Style.css";
// import logo from "../../images/imgchatroom.jpg";
import logo from "../../images/chatroomimg.png";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { FaPlay, FaMusic, FaCloudUploadAlt } from "react-icons/fa";

const ChatRoom = () => {
return (
    <div className='chatroom'>
     {/* <div className='icons'> */}
     <div id="container">
        {/* <div className="icon1"> */}
        <div class="top left">
        <AvatarIcon
              imageUrl='https://robohash.org/32?set=set2'
              AvatarWidth='100'
        />
        </div>


        {/* <div className="icon2"> */}
        <div class="top right">
        <AvatarIcon
              imageUrl='https://robohash.org/31?set=set2'
              AvatarWidth='100'
        />
        </div>

        {/* <div className="image">
      <div>
        <img
          src={logo}
          alt='Logo'
          className='logo-image'
          style={{ cursor: "pointer" }}
       
        />
      </div>

      </div> */}
{/*         
        <div className="icon3"> */}
        <div class="bottom left">
        <AvatarIcon
              imageUrl='https://robohash.org/33?set=set2'
              AvatarWidth='100'
        />
        </div>
        
       
{/*         
        <div className="icon4"> */}
        <div class="bottom right">
        <AvatarIcon
              imageUrl='https://robohash.org/34?set=set2'
              AvatarWidth='100'
        />
        </div>

      </div>

      <div className="image">
      <div>
        <img
          src={logo}
          alt='Logo'
          className='logo-image'
          style={{ cursor: "pointer" }}
       
        />
  
      </div>
      </div>
      
      

      <Row className='mb-2 ml-4 px-4'>
                <Col xs={12} md={10} lg={10}>
                
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

                      style={{
                        paddingLeft: "50px",
                        borderRadius: "50px 0 0 50px",
                      }}
                      disabled
                    />
                    <InputGroup.Text className='px-1'>
                      <FaPlay style={{ fontSize: "24px", width: "50px" }} />
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
            </Row>
            
            <div className="button">
            <Button variant="primary" size="lg">Take Votes</Button>
            </div>
</div>

)
}

export default ChatRoom;