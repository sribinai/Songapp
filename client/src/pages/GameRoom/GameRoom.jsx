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
      <div
        className='d-flex flex-column align-items-center bg-light'
        style={{ minHeight: "calc(100vh - 62px)", padding: "20px" }}
      >
        <Container
          className='d-flex justify-content-center align-items-center'
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            minHeight: "calc(100vh - 100px)",
            // minWidth: "calc(100vw - 60px)",
          }}
          fluid
        >
          <Row
            style={{
              height: "100%",
              width: "100%",
              padding: "10px",
              display: "grid",
              gridGap: "10px",
              gridTemplateColumns: "repeat(5, 1fr)",
            }}
          >
            <Col
              className='d-flex flex-column justify-content-center align-items-center rounded'
              style={{
                border: "1px solid gray",
                backgroudColor: "yellow",
                minHeight: "120px",
                gridColumnStart: "2",
                gridColumnEnd: "5",
                gridRowStart: "2",
                gridRowEnd: "5",
              }}
            >
              <div
                className='d-flex justify-content-center align-items-center'
                style={{
                  backgroundColor: "rgb(150, 200, 100)",
                  height: "320px",
                  width: "320px",
                  borderRadius: "50%",
                }}
              >
                Hello666
              </div>
              <div>Hi</div>
              <div>Hi</div>
            </Col>
            <Col
              className='d-sm-none d-md-flex justify-content-center text-center align-items-center rounded'
              style={{
                border: "1px solid red",
                backgroudColor: "yellow",
                minHeight: "120px",
                gridColumnStart: "3",
                gridColumnEnd: "4",
                gridRowStart: "1",
                gridRowEnd: "2",
              }}
            >
              center Text message
            </Col>
            {/* {dataArray && */}
            {dataArray.map((item, index) => (
              <Col
                key={index}
                className='d-sm-none d-none d-md-flex justify-content-center align-items-center rounded'
                style={{
                  border: "1px solid red",
                  backgroudColor: "yellow",
                  minHeight: "120px",
                }}
              >
                Div {item + 1}
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default GameRoom;
