import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import io from "socket.io-client";

import { DATA_URL } from "../../index";
import Swal from "sweetalert2";
import AvatarIcon from "../../components/AvatarIcon/AvatarIcon";
import MainHeaderDiv from "../../components/layouts/MainHeaderDiv/MainHeaderDiv";
import { FaPlay, FaMusic, FaCloudUploadAlt } from "react-icons/fa";
import logo from "../../images/chatroomimg.png";


import "./game-room.styles.css";
import PlayInstructionsModal from "../../components/PlayInstructions/PlayInstructions";
import FloatingTextBlock from "../../components/layouts/FloatingTextBlock/FloatingTextBlock";

let socket;

const GameRoom = (props) => {
  let history = useHistory();
  const ENDPOINT = DATA_URL;
  const [joinRoomStatus, setJoinRoomStatus] = useState(false);
  const [userID, setUserID] = useState("");
  const [roomID, setRoomID] = useState("");
  const [roomPlayers, setRoomPlayers] = useState([]);
  const [hostName, setHostName] = useState("");
  const [guestName, setGuestName] = useState("");
  const [roomDetails, setRoomDetails] = useState(null); // For room Details to be saved
  const [message, setMessage] = useState("");
  const [chatBoxData, setChatBoxData] = useState([]);

  const [songCount, setSongCount] = useState(null);
  const [songLink, setSongLink] = useState("");
  const [songsList, setSongsList] = useState([]);
  const [showRules, setShowRules] = useState(false);

  //Temp array
  const dataArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Function to set user Details
  const setUserDetails = () => {
    // Set userID, UserName/GuestName, RoomID
    const room_id = props.location.search.split("=")[1];
    setUserID(props.userInfo.data.id);
    setGuestName(props.userInfo.data.user_name);
    setRoomID(room_id);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    if (!props.location.state) {
      history.push({
        pathname: "/",
        search: "?authorization=false",
      });
    }
    // Fetch data from localStorage
    console.log(props.location.state);
    // setUserDetails();
    // if (roomID.length !== 0 && userID.length !== 0) {
    //   // Fetch all the details for this page
    //   fetchRoomDetails();
    //   if (songCount === null) {
    //     // fetchPlayersDetails(); // Check if required later
    //     fetchSongs();
    //   } else {
    //     if (!joinRoomStatus) {
    //       socket.emit("join_room", {
    //         user_id: userID,
    //         room_id: roomID,
    //         name: guestName,
    //         songs_list: songsList,
    //         song_count: songCount,
    //       });
    //       setJoinRoomStatus(true);
    //     }
    //   }

    //   socket.on("message", (message) => {
    //     console.log(message);
    //     setChatBoxData((chatBoxData) => [...chatBoxData, message]);
    //   });

    //   socket.on("roomUsers", ({ users }) => {
    //     // console.log(room_id);
    //     console.log(users);
    //     setRoomPlayers(users);
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ENDPOINT, roomID, userID, songCount]);

  useEffect(() => {
    // Cleanup function to be run on Unmounting the component
    return () => {
      // socket.close();
      socket.disconnect();
    };
  }, []);

  // Function to emit Chat messages to Socket IO
  const emitChatMessages = () => {
    socket.emit("chat_message", {
      user_id: userID,
      room_id: roomID,
      name: guestName,
      message: message,
    });
  };

  return (
    <div className='main-container'>
      <MainHeaderDiv
        title='Exit Room'
        routeName='Home'
        redirectPromt={true}
        promptMessage='Are you sure, you want to leave the room?'
        userInfo={props.userInfo.data}
      />
      <div className='d-flex flex-column align-items-center bg-light'
       style={{ minHeight: "calc(100vh - 62px)" }}>
     
       {/* <div className="wrapper"> */}
        <Container fluid>
        
        <div className="icon1">
        <div className="avatar1"> 
        <AvatarIcon
              imageUrl='https://robohash.org/32?set=set2'
              AvatarWidth='80'
        />
        </div>
       <div className>Player Name</div>
        </div>

        <div className="icon2">
        <div className="avatar2"> 
        <AvatarIcon
              imageUrl='https://robohash.org/31?set=set2'
              AvatarWidth='80'
        />
        </div>
        <div className>Player Name</div>
        </div>

        <div className="icon3">
        <AvatarIcon
              imageUrl='https://robohash.org/33?set=set2'
              AvatarWidth='80'
        />
        <div className>Player Name</div>
        </div>

        <div className="icon4">
        <div className>Player Name</div>
        <AvatarIcon
              imageUrl='https://robohash.org/34?set=set2'
              AvatarWidth='80'
        />
        </div>
        
        
        <div className="image">
      <div className="image1">
        <img
          src={logo}
          alt='Logo'
          className='logo-image'
          style={{ cursor: "pointer" }}
       
        />
        
      </div>

      <div className='songs-div'>
      <InputGroup style={{ position: "relative" }}>
                  
      
                  <span
                    style={{
                      position: "absolute",
                      zIndex: "4",
                      left: "3px",
                      top: "3px",
                      // height: "33px",
                      height: "35px",
                      // width: "35px",
                      width: "50px",
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
          </div>
             
          <div className="button">
          <button className='take-votes-button'>
          TAKE VOTES
        </button>
        </div>
      </div>
      
      <div className="icon5">
      <div className>Player Name</div>
        <AvatarIcon
              imageUrl='https://robohash.org/38?set=set2'
              AvatarWidth='80'
        />
        </div>



        </Container>
        </div>
    </div>
  );
};

export default GameRoom;
