import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import io from "socket.io-client";

import { DATA_URL } from "../../index";
import Swal from "sweetalert2";
import AvatarIcon from "../../components/AvatarIcon/AvatarIcon";
import MainHeaderDiv from "../../components/layouts/MainHeaderDiv/MainHeaderDiv";
import {
  FaPlay,
  FaMusic,
  FaCloudUploadAlt,
  FaPlus,
  FaPlusCircle,
  FaTrashAlt,
} from "react-icons/fa";

import "./player-dashboard.styles.css";
import PlayInstructionsModal from "../../components/PlayInstructions/PlayInstructions";
import FloatingTextBlock from "../../components/layouts/FloatingTextBlock/FloatingTextBlock";

let socket;

const PlayerDashboard = (props) => {
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

  // Function to set user Details
  const setUserDetails = () => {
    // Set userID, UserName/GuestName, RoomID
    const room_id = props.location.search.split("=")[1];
    setUserID(props.userInfo.data.id);
    setGuestName(props.userInfo.data.user_name);
    setRoomID(room_id);
  };

  // Function to fetch room Details
  const fetchRoomDetails = async () => {
    try {
      const response = await axios.post(
        `${DATA_URL}/playlist/api/room/get-room-details`,
        {
          room_id: roomID,
        }
      );
      // console.log(response);
      if (response.status === 200) {
        setRoomDetails(response.data.roomDetails);
        setHostName(response.data.host_name);
      } else {
        console.log(response.data.message);
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: response.data.message,
        });
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: error.response.data.message,
        });
      } else {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Something went wrong.",
        });
      }
    }
  };

  // Function to fetch songs of the user
  const fetchSongs = async () => {
    try {
      const response = await axios.post(
        `${DATA_URL}/playlist/api/game/get-songs`,
        {
          room_id: roomID,
          player_id: userID,
        }
      );
      // console.log(response);
      if (response.status === 200) {
        // Reset song input data to empty
        setSongsList(response.data.songsData);
        setSongCount(response.data.songsData.length);
        return;
      } else {
        console.log(response.data.message);
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: response.data.message,
        });
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: error.response.data.message,
        });
      } else {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Something went wrong.",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    setUserDetails();
    if (roomID.length !== 0 && userID.length !== 0) {
      // Fetch all the details for this page
      fetchRoomDetails();
      if (songCount === null) {
        // fetchPlayersDetails(); // Check if required later
        fetchSongs();
      } else {
        if (!joinRoomStatus) {
          socket.emit("join_room", {
            user_id: userID,
            room_id: roomID,
            name: guestName,
            songs_list: songsList,
            song_count: songCount,
          });
          setJoinRoomStatus(true);
        }
      }

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
        // console.log(users);
        setRoomPlayers(users);
      });
    }
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

  // Function to add songs to the list
  const addSongs = async (e) => {
    e.preventDefault();
    // console.log("add songs function");
    if (songLink === "") {
      Swal.fire({
        icon: "warning",
        title: "Song Link Empty",
        text: "Song Link cannot be empty.",
      });
      return;
    }
    try {
      const response = await axios.post(
        `${DATA_URL}/playlist/api/game/add-song`,
        {
          room_id: roomID,
          player_id: userID,
          song: songLink,
        }
      );
      // console.log(response);
      if (response.status === 200) {
        socket.emit("add_songs", {
          name: guestName,
          new_song: songLink,
        });
        fetchSongs();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
        });
        // Reset song input data to empty
        setSongLink("");
        return;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: response.data.message,
        });
        return;
      }
    } catch (error) {
      // console.log(error);
      if (error.response.data.message) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Something went wrong.",
        });
      }
    }
  };

  const handleClickSong = async (e, song) => {
    e.preventDefault();
    try {
      const deleteConfirm = await  Swal.fire({
        title: "Are you sure to remove this song from the list?",
        showDenyButton: true,
        confirmButtonText: "Yes",
      });
      
      if (deleteConfirm.isConfirmed) {
          const response = await axios.post(
            `${DATA_URL}/playlist/api/game/delete-song`,
            {
              song,
              room_id: roomID,
              player_id: userID,
            }
          );
          if (response.status === 200) {
            Swal.fire("Success", response.data.message, "success");
            fetchSongs();
            return;
          }
      }
      
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response,
        });
      }
    }
  };

  const handleStartGame = async (e) => {
    e.preventDefault();
    if (userID === roomDetails.host_id) {
      let countStatus = true;
      // Fetch all users data and check if they have added atleast 3 songs for now
      // emit roomID to fetch users songCount Details
      socket.emit("request_song_details", { room_id: roomID });
      socket.on("get_room_details", (data) => {
        // console.log(data);
        data.forEach((item) => {
          if (item.song_count < 3) {
            countStatus = false;
            return;
          }
        });
        if (!countStatus) {
          Swal.fire({
            icon: "error",
            title: "Songs Required",
            text: "Every Player needs to add atleast 4 songs to continue.",
          });
          return;
        }
      });
      // Redirect to GameRoom emitting an event so others might also join
      socket.emit("start_game", {
        room_data: roomDetails,
        room_players: roomPlayers,
      });
      return;
    } else {
      Swal.fire({
        icon: "warning",
        title: "Not Authorized",
        text: "Only the Room Host can start the Game",
      });
      return;
    }
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
      <div className='px-5 py-3 d-flex flex-column align-items-center'>
        <Container fluid>
          <Row
            className='mb-3 p-2 rounded'
            style={{ backgroundColor: "rgb(200, 200, 200, 0.5)" }}
          >
            <Col lg={9} md={8} sm={7} xs={12} className='d-flex'>
              <AvatarIcon imageUrl='https://robohash.org/36?set=set8' />
              {roomDetails && (
                <div className='d-flex flex-column justify-content-center m-2'>
                  <span>RoomID: {roomID}</span>
                  <span>RoomName: {roomDetails.room_name}</span>
                  <span>Host Name: {hostName}</span>
                  {/* <span>Host Name: {roomDetails.host_id}</span> */}
                  <span>Player Limit: {roomDetails.no_of_players}</span>
                </div>
              )}
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
                onClick={() => setShowRules(true)}
              >
                Room Rules
              </Button>
            </Col>
          </Row>
          <PlayInstructionsModal
            show={showRules}
            onHide={() => setShowRules(false)}
          >
            Game rules set by the Host.
          </PlayInstructionsModal>
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
            {roomPlayers.length !== 0 &&
              roomPlayers.map((item, index) => (
                <div
                  key={index}
                  className='d-flex flex-column justify-content-center align-items-center p-2 m-1'
                >
                  <AvatarIcon
                    imageUrl='https://robohash.org/46?set=set4'
                    statusDetails={true}
                    showStatus={true}
                  />
                  <span>{item.name}</span>
                  <span>
                    {item.song_count ? item.song_count : "No"} songs added
                  </span>
                </div>
              ))}
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
                <Form.Control
                  type='url'
                  value={songLink}
                  onChange={(e) => setSongLink(e.target.value)}
                  placeholder='Place link here'
                />
                <InputGroup.Text className='px-1'>
                  <FaCloudUploadAlt
                    style={{ fontSize: "24px", width: "50px" }}
                  />
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Col xs={12} md={2}>
              <Button
                variant='light'
                className='d-flex w-100 justify-content-center align-items-center'
                onClick={addSongs}
              >
                <FaPlusCircle className='me-1 text-success' size={22} />
                ADD
              </Button>
            </Col>
          </Row>
          {songsList.length !== 0 &&
            songsList.map((song, index) => (
              <Row key={index} className='mb-2 px-4'>
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
                      value={song}
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
                <Col xs={12} md={2}>
                  <Button
                    variant='danger'
                    className='d-flex w-100 justify-content-center align-items-center'
                    onClick={(e) => handleClickSong(e, song)}
                  >
                    <FaTrashAlt className='ms-1' size={22} />
                    REMOVE
                  </Button>
                </Col>
              </Row>
            ))}
        </Container>
        <button className='start-game-button' onClick={handleStartGame}>
          START GAME
        </button>
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

export default PlayerDashboard;
