import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import io from "socket.io-client";

import { DATA_URL } from "../../index";
import Swal from "sweetalert2";
import AvatarIcon from "../../components/AvatarIcon/AvatarIcon";
import MainHeaderDiv from "../../components/layouts/MainHeaderDiv/MainHeaderDiv";
import { FaPlay, FaMusic, FaCloudUploadAlt } from "react-icons/fa";

import "./player-dashboard.styles.css";
import PlayInstructionsModal from "../../components/PlayInstructions/PlayInstructions";

const socket = io.connect(`http://localhost:4000`);

const PlayerDashboard = (props) => {
  const [userID, setUserID] = useState("");
  const [roomID, setRoomID] = useState("");
  const [hostName, setHostName] = useState("");
  const [guestName, setGuestName] = useState("");
  const [roomDetails, setRoomDetails] = useState(null); // For room Details to be saved

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
      console.log(response);
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
  // Function to fetch players Details
  const fetchPlayersDetails = async () => {
    try {
      console.log("fetch user details to view");
      const response = await axios.post(
        `${DATA_URL}/playlist/api/user/get-user-details`,
        {
          user_id: userID,
        }
      );
      // console.log(response);
      if (response.status === 200) {
        console.log(response.data);
      } else {
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
      console.log(response);
      if (response.status === 200) {
        // Reset song input data to empty
        setSongsList(response.data.songsData);
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
    setUserDetails();
    if (roomID.length !== 0 && userID.length !== 0) {
      // socket = io(DATA_URL);
      // Fetch all the details for this page
      fetchRoomDetails();
      // fetchPlayersDetails(); // Check if required later
      fetchSongs();
      // console.log(socket);
      socket.emit("join_room", {
        user_id: userID,
        room_id: roomID,
        name: guestName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomID, userID]);

  // Function to add songs to the list
  const addSongs = async (e) => {
    e.preventDefault();
    // console.log("add songs function");
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

  return (
    <div className='main-container'>
      <MainHeaderDiv
        title='Exit Room'
        routeName='Home'
        redirectPromt={true}
        promptMessage='Are you sure, you want to leave the room?'
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
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/36?set=set8'
                statusDetails={true}
                showStatus={true}
              />
              <span>Godson</span>
              <span>10 songs added</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/46?set=set4'
                statusDetails={false}
                showStatus={true}
              />
              <span>John</span>
              <span>No songs added</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/10?set=set5'
                statusDetails={true}
                showStatus={true}
              />
              <span>Rahul</span>
              <span>10 songs added</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/14?set=set5'
                statusDetails={true}
                showStatus={true}
              />
              <span>Harry</span>
              <span>2 songs added</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/13?set=set24'
                statusDetails={false}
                showStatus={true}
              />
              <span>Yash</span>
              <span>No songs added</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/30?set=set3'
                statusDetails={true}
                showStatus={true}
              />
              <span>Raj</span>
              <span>1 songs added</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/11?set=set4'
                statusDetails={true}
                showStatus={true}
              />
              <span>Raj</span>
              <span>10 songs added</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center p-2 m-1'>
              <AvatarIcon
                imageUrl='https://robohash.org/25?set=set4'
                statusDetails={true}
                showStatus={true}
              />
              <span>Raj</span>
              <span>10 songs added</span>
            </div>
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
                onClick={addSongs}
                style={{ width: "100%" }}
              >
                ADD
              </Button>
            </Col>
          </Row>
          {/* {songsList && songsList.map((item, index) => ())} */}
          {/* <Row className='mb-2 px-4'>
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
                  value='Songs Title'
                  style={{ paddingLeft: "50px", borderRadius: "50px 0 0 50px" }}
                  disabled
                />
                <InputGroup.Text className='px-1'>
                  <FaPlay style={{ fontSize: "24px", width: "50px" }} />
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Col xs={12} md={2}>
              <Button variant='light' style={{ width: "100%" }}>
                REMOVE
              </Button>
            </Col>
          </Row> */}
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
                  <Button variant='light' style={{ width: "100%" }}>
                    REMOVE
                  </Button>
                </Col>
              </Row>
            ))}
        </Container>
        <button className='start-game-button'>START GAME</button>
      </div>
    </div>
  );
};

export default PlayerDashboard;
