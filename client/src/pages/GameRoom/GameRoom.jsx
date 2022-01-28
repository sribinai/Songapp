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
  const [roomID, setRoomID] = useState("");
  const [hostID, setHostID] = useState("");
  const [userID, setUserID] = useState("");
  // const [gameStatus, setGameStatus] = useState("");
  const [roomDetails, setRoomDetails] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [players, setPlayers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [songsCount, setSongsCount] = useState('');
  
  const handleStartGame = async (room_id) => {
    try {
      const response = await axios.post(`${DATA_URL}/playlist/api/room/start-game`, { room_id });
      if (response.status === 200) {
        console.log(response)
        setRoomDetails(response.data.gameData);
        setHostID(response.data.gameData.host_id);
        handleFetchRoomSongs(room_id);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  }
  
  const handleFetchRoomSongs = async (room_id) => {
    try {
      const response = await axios.post(`${DATA_URL}/playlist/api/song/get-room-songs`, { room_id });
      if (response.status === 200) {
        console.log(response);
        setSongs(response.data.songsData);
        setSongsCount(response.data.songsCount);
        handlePickRandomSong(response.data.songsData);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  }

  const handlePickRandomSong = (songs_list) => {
    // console.log(Math.floor(Math.random()*(songs_list.length)));
    let song_index = Math.floor(Math.random()*(songs_list.length));
    setCurrentSong(songs_list[song_index]);
  }

  useEffect(() => {
    if (roomID === "") {
      let room_id = props.location.search.split("=")[1];
      setUserID(props.userInfo.data.id);
      setRoomID(room_id)
      handleStartGame(room_id);
    }
  }, [roomID])

  const handleVotingPlayer = async (e, song_id, voted_player_id) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${DATA_URL}/playlist/api/song//vote-player`, {
        room_id: roomID,
        song_id,
        voted_player_id,
        player_id: userID

      })
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  }

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
        <div>
          <i>
            {roomDetails !== null && (
              <div>
                <span className='me-2'>
                  <b>Room Name:</b> {roomDetails.room_name}
                </span>
                |
                <span className='ms-2'>
                  <b>RoomID:</b> {roomDetails.room_id}
                </span>
              </div>
              )}
          </i>
        </div>
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
                <InputGroup.Text className='px-1' style={{ position: "relative", borderRadius: "50% 0px 0px 50%" }}>
                <span
                  style={{
                    // position: "absolute",
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
                </InputGroup.Text>
                <Form.Control type='text' disabled />
                <InputGroup.Text className='px-1'>
                  <FaPlay style={{ fontSize: "24px", width: "50px" }} />
                </InputGroup.Text>
              </InputGroup>
              <Button className='w-100 text-center mb-2' onClick={handleVotingPlayer}>TAKE VOTES</Button>
            </Col>

            {/* {roomPlayers.map((player, index) => (
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
                      // streamButtons={true}
                      // streamData={streamVideo}
                      // passAudio={passAudio}
                      // toggleAudio={() => setPassAudio(!passAudio)}
                      // passVideo={passVideo}
                      // toggleVideo={() => setPassVideo(!passVideo)}
                    />
                  </div>
                  <div>{player.name}</div>
                </div>
              </Col>
            ))} */}
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
      {/* <FloatingTextBlock
        textMessages={chatBoxData}
        message={message}
        userID={userID}
        setMessage={(e) => setMessage(e.target.value)}
        onClick={(e) => {
          e.preventDefault();
          emitChatMessages();
          setMessage("");
        }}
      /> */}
    </div>
  );
};

export default GameRoom;
