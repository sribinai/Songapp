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
import {
  FaPlay,
  FaMusic,
  FaCloudUploadAlt,
  FaCloudDownloadAlt,
} from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { MdWhereToVote } from "react-icons/md";
import musicImage from "../../images/chatroomimg.png";


import { render } from "react-dom";

import "./game-room.styles.css";
import PlayInstructionsModal from "../../components/PlayInstructions/PlayInstructions";
import FloatingTextBlock from "../../components/layouts/FloatingTextBlock/FloatingTextBlock";
import { BiRefresh } from "react-icons/bi";
import { NotifyToastContainer } from "../../components/NotifyToast/NotifyToast";

let socket;
let myPeer = new Peer();

const GameRoom = (props) => {
  let history = useHistory();
  const ENDPOINT = DATA_URL;
  const [roomID, setRoomID] = useState("");
  const [hostID, setHostID] = useState("");
  const [userID, setUserID] = useState("");
  const [hostName, setHostName] = useState("");
  const [guestName, setGuestName] = useState("");
  // const [gameStatus, setGameStatus] = useState("");
  const [roomDetails, setRoomDetails] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [playerSongsCount, setPlayerSongsCount] = useState("");
  const [players, setPlayers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [songsCount, setSongsCount] = useState("");
  const [message, setMessage] = useState("");
  const [chatBoxData, setChatBoxData] = useState([]);
  const [roomPlayers, setRoomPlayers] = useState([]);

  const [notification, setNotification] = useState(false);

  const handleStartGame = async (room_id) => {
    try {
      const response = await axios.post(
        `${DATA_URL}/playlist/api/room/start-game`,
        { room_id }
      );
      if (response.status === 200) {
        console.log(response);
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
  };

  const handleFetchRoomSongs = async (room_id) => {
    try {
      const response = await axios.post(
        `${DATA_URL}/playlist/api/song/get-room-songs`,
        { room_id }
      );
      if (response.status === 200) {
        setSongs(response.data.songsData);
        setSongsCount(response.data.songsCount);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };

  // pick using node js and socket io
  const handlePickRandomSong = async (e, room_id) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${DATA_URL}/playlist/api/song//get-random-room-song`,
        { room_id }
      );
      if (response.status === 200) {
        console.log(response);
        setCurrentSong(response.data.randomSong);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong.",
        });
      }
    }
  };

  useEffect(() => {
    if (roomID === "") {
      let room_id = props.location.search.split("=")[1];
      setUserID(props.userInfo.data.id);
      setGuestName(props.userInfo.data.user_name);
      setRoomID(room_id);
      handleStartGame(room_id);
    }
  }, [roomID]);

  const handleVotingPlayer = async (e, song_id, voted_player_id) => {
    e.preventDefault();
    try {
      if (song_id === null) {
        Swal.fire({
          icon: 'warning',
          title: "Song Unavailable",
          text: 'Please fetch a song to vote'
        })
        return;  
      }

      const response = await axios.post(
        `${DATA_URL}/playlist/api/song//vote-player`,
        {
          room_id: roomID,
          song_id,
          voted_player_id,
          player_id: userID,
        }
      );
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    if (roomID.length !== 0 && userID.length !== 0) {
      // Fetch all the details for this page
      // if (playerSongsCount === null) {
      //   if (!joinRoomStatus) {
      socket.emit("join_room", {
        user_id: userID,
        room_id: roomID,
        name: guestName,
        // songs_list: songsList,
        // song_count: playerSongsCount,
      });
      // setJoinRoomStatus(true);
      //   }
      // }

      socket.on("message", (message) => {
        console.log(message);
        setChatBoxData((chatBoxData) => [...chatBoxData, message]);
      });
      
      socket.on("gameStatus", (data) => {
        // console.log(data);
        if (data.game_status === true) {
          Swal.fire({
            icon: "success",
            title: "Game Started",
            text: "Welcome, The game is ON...!!!",
          });
          history.push({
            pathname: "/game-room",
            search: `?room_id=${roomID}`,
            state: {
              user_id: userID,
              room_data: data.room_data,
              room_players: data.room_players,
            },
          });
          return;
        }
      });
      
      socket.on("roomUsers", ({ users }) => {
        setRoomPlayers(users);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ENDPOINT, roomID, userID, playerSongsCount]);
  
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
  
  // if (notification) {
  //  <NotifyToastContainer title="Godson" message='This message is for Godson' type='success' />
  // }
  // const ShowError = () => {
  //   render(<NotifyToastContainer title="Godson" message='This message is for Godson' type='success' />);
  //   // render(<ToastNotification title='HRMS' body='ERROR!' color='red' />);
  // };
  
// test("it expands when the button is clicked",() => {
//   render(<Button>Hello, Test button</Button>)
// });
  
  return (
    <div className='main-container'>
      <MainHeaderDiv
        title='Exit Room'
        routeName='Home'
        redirectPromt={true}
        promptMessage='Are you sure, you want to leave the room?'
        userInfo={props.userInfo.data}
      />

      {/* <button onClick={() => ShowError()}>Click on me</button> */}
      {/* <button onClick={() => setNotification(!notification)}>Click on me</button> */}

      {/* <NotifyToastContainer title="Godson" message='This message is for Godson' type='success' />
      <NotifyToastContainer title="Godson" message='This message is for Godson' type='error' />
      <NotifyToastContainer title="Godson" message='This message is for Godson' type='warning' /> */}

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
                gridRowStart: "1",
                gridRowEnd: "2",
                position: "relative",
              }}
            >
              <div
                className='bg-primary text-white d-flex text-center p-1'
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "10px",
                  borderRadius: "50%",
                }}
              >
                {/* <FaCloudDownloadAlt /> */}
                <FiRefreshCcw
                  onClick={(e) => handlePickRandomSong(e, roomID)}
                  title='Fetch random song'
                />
              </div>

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
                <InputGroup.Text
                  className='px-1'
                  style={{
                    position: "relative",
                    borderRadius: "50% 0px 0px 50%",
                  }}
                >
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
                <Form.Control
                  type='text'
                  value={currentSong ? currentSong.song : ""}
                  disabled
                />
                <InputGroup.Text className='px-1'>
                  <FaPlay style={{ fontSize: "24px", width: "50px" }} />
                </InputGroup.Text>
              </InputGroup>
              <Button
                className='w-100 text-center mb-2'
                // onClick={handleVotingPlayer}
              >
                TAKE VOTES
              </Button>
              {/* Check every player has voted using socket IO and accordingly fetch a new song to all players using socket IO */}
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
                  <div className='avatar1' style={{ position: "relative" }}>
                    <Button
                      onClick={(e) => handleVotingPlayer(e, currentSong !== null ? currentSong._id : null, player.user_id )}
                      className='bg-warning d-flex justify-content-center align-items-center p-0'
                      title="Click here to vote"
                      style={{
                        position: "absolute",
                        left: "10px",
                        top: "10px",
                        zIndex: "100",
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                        fontSize: "20px",
                      }}
                    >
                      <MdWhereToVote />
                    </Button>
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
            ))}

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
