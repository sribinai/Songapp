import React, { useState, useEffect, useRef } from "react";
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

import "./dashboard.styles.css";
import PlayInstructionsModal from "../../components/PlayInstructions/PlayInstructions";
import FloatingTextBlock from "../../components/layouts/FloatingTextBlock/FloatingTextBlock";
import PlayerDashboard from "../PlayerDashboard/PlayerDashboard";
import GameRoom from "../GameRoom/GameRoom";

let socket;

const Dashboard = (props) => {
  let history = useHistory();
  const ENDPOINT = DATA_URL;
  const fetchRef = useRef(null);
  const [GameStatus, setGameStatus] = useState('not_started');
  const [joinRoomStatus, setJoinRoomStatus] = useState(false);
  const [userID, setUserID] = useState("");
  const [roomID, setRoomID] = useState("");
  const [roomPlayers, setRoomPlayers] = useState([]);
  const [hostName, setHostName] = useState("");
  const [guestName, setGuestName] = useState("");
  const [roomDetails, setRoomDetails] = useState(null); // For room Details to be saved
  const [message, setMessage] = useState("");
  const [chatBoxData, setChatBoxData] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const [PlayerSongCount, setPlayerSongCount] = useState(null);
  const [songLink, setSongLink] = useState("");
  const [PlayerSongsList, setPlayerSongsList] = useState([]);
  const [showRules, setShowRules] = useState(false);
  const [RoomSongs, setRoomSongs] = useState([]);
  const [RoomSongsCount, setRoomSongsCount] = useState("");

  // Function to set user Details
  const setUserDetails = () => {
    // Set userID, UserName/GuestName, RoomID
    const room_id = props.location.search.split("=")[1];
    setUserID(props.userInfo.data.id);
    setGuestName(props.userInfo.data.user_name);
    setRoomID(room_id);
    fetchRoomDetails(room_id);
    fetchSongs(room_id,props.userInfo.data.id);
  };

  // Function to fetch room Details
  const fetchRoomDetails = async (room_id) => {
    try {
      console.log('fetchRoomDetails function called');
      const response = await axios.post(`${DATA_URL}/playlist/api/room/get-room-details`,{ room_id });
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

  // Function to fetch songs of the user
  const fetchSongs = async (room_id, player_id) => {
    try {
      console.log("fetchSongs called");
      const response = await axios.post(
        `${DATA_URL}/playlist/api/song/get-player-songs`,
        {
          room_id,
          player_id,
        }
      );
      if (response.status === 200) {
        // Reset song input data to empty
        console.log(response);
        setPlayerSongsList(response.data.songsData);
        setPlayerSongCount(response.data.songsCount);
        return;
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        // Swal.fire({
        //   icon: "error",
        //   title: "Oops..",
        //   text: error.response.data.message,
        // });
      } else {
        console.log(error);
        // Swal.fire({
        //   icon: "error",
        //   title: "Oops..",
        //   text: "Something went wrong.",
        // });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    if (roomID.length === 0 && userID.length === 0) {
      setUserDetails();
    } else {
    // if (roomID.length !== 0 && userID.length !== 0) {
      // if (PlayerSongCount === null) {
      //   // fetchPlayersDetails(); // Check if required later
      //   fetchSongs();
      // } else {
        if (!joinRoomStatus) {
          socket.emit("join_room", {
            user_id: userID,
            room_id: roomID,
            name: guestName,
            songs_list: PlayerSongsList,
            song_count: PlayerSongCount,
          });
          setJoinRoomStatus(true);
        }
      // }

      socket.on("message", (message) => {
        console.log(message);
        setChatBoxData((chatBoxData) => [...chatBoxData, message]);
      });

      socket.on("gameStatus", ({game_status}) => {
      // socket.on("gameStatus", ({game_status,room_data,room_players,users}) => {
        console.log("gameStatus");
        console.log(game_status);
        if (game_status === true) {
          setGameStatus('started');
          Swal.fire({
            icon: "success",
            title: "Game Started",
            text: "Welcome, The game is ON...!!!",
          });
          return;
        }
      });

      socket.on("get_room_details", (data) => {
        console.log("get room details");
        let countStatus = true;
        data.forEach((user) => {
          // minimum of 2 songs for now
          if (user.song_count < 2) {
            countStatus = false;
          }
        });
        console.log("countStatus");
        console.log(countStatus);
        if (!countStatus) {
          Swal.fire({
            icon: "error",
            title: "Songs Required",
            text: "Every Player needs to add atleast 2 songs to continue.",
          });
          return;
        }
          handleFetchRoomSongs(roomID, userID);
          console.log("start_game")
          // Redirect to GameRoom emitting an event so others might also join
          socket.emit("start_game");
          // socket.emit("start_game", {
          //   // room_id: roomID,
          //   // room_data: roomDetails,
          //   // room_players: roomPlayers,
          // });
      });

      socket.on("roomUsers", ({ users }) => {
        console.log("roomUsers")
        console.log(users)
        if (users) {
        // if (users.length !== 0) {
          setRoomPlayers(users);
        }
      });

      socket.on("notification", ({ success, message, all_voted }) => {
        console.log({ success, message, all_voted });
        if (all_voted) {
          // check how many songs are left if more songs are left then pick a random song else show the scores
          checkRoomSongCount(roomID);
          // handlePickRandomSong(roomID);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ roomID, userID ]);

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
    if (songLink === "") {
      Swal.fire({
        icon: "warning",
        title: "Song Link Empty",
        text: "Song Link cannot be empty.",
      });
      return;
    }
    try {
      console.log("add songs function");
      const response = await axios.post(
        `${DATA_URL}/playlist/api/song/add-song`,
        {
          room_id: roomID,
          player_id: userID,
          song: songLink,
        }
      );
      if (response.status === 200) {
        console.log(response);
        fetchSongs(roomID,userID);
        socket.emit("add_songs", {
          name: guestName,
          new_song: songLink,
        });
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

  const handleDeleteSong = async (e, song_id) => {
    e.preventDefault();
    try {
      const deleteConfirm = await Swal.fire({
        title: "Are you sure to remove this song from the list?",
        showDenyButton: true,
        confirmButtonText: "Yes",
      });

      console.log("handleDeleteSong function");
      if (deleteConfirm.isConfirmed) {
        const response = await axios.post(
          `${DATA_URL}/playlist/api/song/delete-song`,
          {
            song_id,
            player_id: userID,
          }
        );
        if (response.status === 200) {
          console.log(response);
          fetchSongs(roomID,userID);
          Swal.fire("Success", response.data.message, "success");
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
    try {
      console.log('start game')
      if (userID === roomDetails.host_id) {
        console.log('start game2')
        // Fetch all users data and check if they have added atleast 3 songs for now
        // emit roomID to fetch users songCount Details
        socket.emit("request_song_details", { room_id: roomID });
        return;
      } else {
        Swal.fire({
          icon: "warning",
          title: "Not Authorized",
          text: "Only the Room Host can start the Game",
        });
        return;
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };

  // Game Room function calls
  const handleFetchRoomSongs = async (room_id, player_id) => {
    try {
      console.log("handleFetchRoomSongs function");
      const response = await axios.post(
        `${DATA_URL}/playlist/api/song/get-room-songs`,
        { room_id, player_id }
      );
      if (response.status === 200) {
        console.log(response);
        setRoomSongs(response.data.songsData);
        setRoomSongsCount(response.data.songsCount);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };
  
  const checkRoomSongCount = async (room_id) => {
    try {
      console.log("checkRoomSongCount function");
      const response = await axios.post(
        `${DATA_URL}/playlist/api/song//get-room-songs`,
        { room_id }
      );
      
      if (response.status === 200) {
        console.log(response);
        if (response.data.songsCount === 0) {
          // setGameStatus('end');
          alert('Game Ended');
        } else {
          console.log("fetchRef");
          console.log(fetchRef);
          console.log(fetchRef.current);
          console.log("call fetch roomSongs function");
          // fetchRef.current.click();
        }
      }

    } catch(error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  }
  // pick using node js and socket io
  const handlePickRandomSong = async (room_id) => {
    try {
      console.log("handlePickRandomSong function");
      const response = await axios.post(
        `${DATA_URL}/playlist/api/song/get-random-room-song`,
        { room_id }
      );
      if (response.status === 200) {
        console.log(response);
        // emit event to socketIO
        socket.emit("send-random-song", {
          room_id: roomID,
          song_details: response.data.randomSong,
        });
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
  const handleVotingPlayer = async (e, song_id, voted_player_id) => {
    e.preventDefault();
    try {
      if (!song_id) {
        Swal.fire({
          icon: "warning",
          title: "Song Unavailable",
          text: "Please fetch a song to vote",
        });
        return;
      }
      
      console.log("handleVotingPlayer function");
      const response = await axios.post(
        `${DATA_URL}/playlist/api/song/vote-player`,
        {
          room_id: roomID,
          song_id,
          voted_player_id,
          player_id: userID,
        }
      );
      if (response.status === 200) {
        socket.emit("player-vote", {
          song_details: {
            song_id: response.data.voteData.song_id,
            voted_player_id: response.data.voteData.voted_player_id,
          },
        });
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

  const handleTakingVotes = async (e) => {
    e.preventDefault();
    if (!currentSong || currentSong === null) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Fetch a song to vote."
      });
      return;
    }
    socket.emit("check-votes", { room_id: roomID, song_id: currentSong._id });
    // Delete this song and their votes data from DB
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
      <PlayerDashboard
        GameStatus={GameStatus}
        roomID={roomID}
        hostName={hostName}
        roomDetails={roomDetails}
        roomPlayers={roomPlayers}
        songLink={songLink}
        songsList={PlayerSongsList}
        onChangeSongLink={(e) => setSongLink(e.target.value)}
        showRules={showRules}
        roomButtonOnClick={() => setShowRules(true)}
        onHideModal={() => setShowRules(false)}
        onClickAddSong={addSongs}
        onClickRemoveSong={handleDeleteSong}
        // onClickRemoveSong={(e, song_id) => handleDeleteSong(e, song_id)}
        onClickStartGame={handleStartGame}
        />

      <GameRoom
        GameStatus={GameStatus}
        ref={fetchRef}
        roomDetails={roomDetails}
        roomPlayers={roomPlayers}
        currentSong={currentSong}
        onClickFetchSong={(e) => {e.preventDefault();handlePickRandomSong(roomID);}}
        handleTakingVotes={handleTakingVotes}
        handleVotingPlayer={handleVotingPlayer}
      />

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

export default Dashboard;
