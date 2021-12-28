import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Image,
} from "react-bootstrap";
import axios from "axios";
import io from "socket.io-client";
import Peer from "peerjs";

import { DATA_URL } from "../../index";
import Swal from "sweetalert2";
import AvatarIcon from "../../components/AvatarIcon/AvatarIcon";
import MainHeaderDiv from "../../components/layouts/MainHeaderDiv/MainHeaderDiv";
import { FaPlay, FaMusic, FaCloudUploadAlt } from "react-icons/fa";
import musicImage from "../../images/chatroomimg.png";

import "./game-room.styles.css";
import PlayInstructionsModal from "../../components/PlayInstructions/PlayInstructions";
import FloatingTextBlock from "../../components/layouts/FloatingTextBlock/FloatingTextBlock";

let socket;
let myPeer = new Peer();

const GameRoom = (props) => {
  let history = useHistory();
  const ENDPOINT = DATA_URL;
  const [joinRoomStatus, setJoinRoomStatus] = useState(false);
  const [userID, setUserID] = useState("");
  const [roomID, setRoomID] = useState("");
  const [roomPlayers, setRoomPlayers] = useState([]);
  const [hostID, setHostID] = useState("");
  const [guestName, setGuestName] = useState("");
  const [roomDetails, setRoomDetails] = useState(null); // For room Details to be saved
  const [message, setMessage] = useState("");
  const [chatBoxData, setChatBoxData] = useState([]);

  const [streamVideo, setStreamVideo] = useState(null);

  const [songCount, setSongCount] = useState(null);
  const [songLink, setSongLink] = useState("");
  const [songsList, setSongsList] = useState([]);
  const [showRules, setShowRules] = useState(false);

  //Temp array
  const dataArray = [0, 1, 2, 3, 4, 5, 6, 7];

  // Function to set user Details
  const setUserDetails = () => {
    // Set userID, UserName/GuestName, RoomID
    // const room_id = props.location.search.split("=")[1];
    setUserID(props.userInfo.data.id);
    setGuestName(props.userInfo.data.user_name);
    setRoomID(props.location.state.room_data.room_id);
    setRoomDetails(props.location.state.room_data);
    setRoomPlayers(props.location.state.room_players);
    setHostID(props.location.state.room_data.host_name);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    if (!props.location.state) {
      history.push({
        pathname: "/",
        search: "?authorization=false",
      });
    }
    // console.log(peer);
    // peer.on()
    // Access the user's video and audio
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        console.log("Streaming my media");
        setStreamVideo(stream)
      });
    // Fetch data from localStorage
    setUserDetails();
    if (roomID.length !== 0 && userID.length !== 0) {
      let conn = myPeer.connect(userID);
      // on open will be launch when you successfully connect to PeerServer
      conn.on("open", function () {
        // here you have conn.id
        conn.send("user connected to peer");
      });
      myPeer.on("connection", function (conn) {
        conn.on("data", function (data) {
          // Will print 'hi!'
          console.log(data);
        });
      });
      // fetchPlayersDetails(); // Check if required later
      socket.emit("join_room", {
        user_id: userID,
        room_id: roomID,
        name: guestName,
        songs_list: songsList,
        song_count: songCount,
      });
      setJoinRoomStatus(true);
    }

    socket.on("message", (message) => {
      console.log(message);
      setChatBoxData((chatBoxData) => [...chatBoxData, message]);
    });

    socket.on("roomUsers", ({ users }) => {
      // console.log(room_id);
      console.log(users);
      setRoomPlayers(users);
    });
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
          className='d-flex justify-content-center align-items-center p-0'
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
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            <Col
              className='d-flex flex-column justify-content-center align-items-center rounded'
              style={{
                border: "1px solid gray",
                backgroudColor: "yellow",
                minHeight: "120px",
                gridColumnStart: "2",
                gridColumnEnd: "3",
                gridRowStart: "2",
                gridRowEnd: "3",
              }}
            >
              <div
                className='d-flex justify-content-center align-items-center p-0 my-2'
                style={{
                  // backgroundColor: "rgb(150, 200, 100)",
                  height: "200px",
                  width: "200px",
                  borderRadius: "50%",
                }}
              >
                <Image
                  src={musicImage}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
              <InputGroup className='mb-2' style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    zIndex: "4",
                    left: "3px",
                    top: "3px",
                    height: "35px",
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
                <Form.Control type='text' disabled />
                <InputGroup.Text className='px-1'>
                  <FaPlay style={{ fontSize: "24px", width: "50px" }} />
                </InputGroup.Text>
              </InputGroup>
              <Button className='w-100 text-center mb-2'>TAKE VOTES</Button>
            </Col>

            {roomPlayers.map((player, index) => (
              <Col
                key={index}
                className='d-sm-none d-none d-md-flex flex-column justify-content-center align-items-center text-center rounded'
                style={{
                  backgroudColor: "yellow",
                  minHeight: "120px",
                }}
              >
                <div className='player-info'>
                  <div className='avatar1'>
                    <AvatarIcon
                      imageUrl='https://robohash.org/32?set=set2'
                      AvatarWidth='180'
                      streamButtons={true}
                      streamData={streamVideo}
                    />
                  </div>
                  <div>{player.name}</div>
                </div>
              </Col>
            ))}
            {/* {dataArray.map((item, index) => (
              <Col
                key={index}
                className='d-sm-none d-none d-md-flex flex-column justify-content-center align-items-center text-center rounded'
                style={{
                  minHeight: "120px",
                }}
              >
                <div className='player-info'>
                  <div className='avatar1'>
                    <AvatarIcon
                      imageUrl='https://robohash.org/31?set=set4'
                      AvatarWidth='130'
                    />
                  </div>
                  <div>Player {index + 1}</div>
                </div>
              </Col>
            ))} */}
          </Row>
        </Container>
      </div>
      <FloatingTextBlock
        textMessages={chatBoxData}
        message={message}
        userID={userID}
        setMessage={(e) => setMessage(e.target.value)}
        onClick={(e) => {
          e.preventDefault();
          emitChatMessages();
          setMessage("");
        }}
      />
    </div>
  );
};

export default GameRoom;
