const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const socketio = require("socket.io");
const { formatMessages } = require("./utils/messages");
const {
  addUser,
  removeUser,
  getUser,
  addVotedDetails,
  getSongsDetails,
  getUsersInRoom,
  addUserSong,
  checkAllVoted,
  removeVotes,
} = require("./utils/users");
const { deletePlayer, removeVotedSongs } = require("./utils/dbOperations");

// Accessing dotenv variables
dotenv.config({ path: "./config/config.env" });

const logger = require("./middlewares/logger");
const userInfo = require("./routes/userRoute");
const roomInfo = require("./routes/roomRoute");
const songInfo = require("./routes/songRoute");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middlewares declaration
let corsOptions = {
  origin: true,
  methods: ["GET", "PUT", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(logger); // Middleware to log in the server console
app.use(cors(corsOptions));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/playlist/api/user", userInfo);
app.use("/playlist/api/room", roomInfo);
app.use("/playlist/api/song", songInfo);

app.get("/", (req, res) => {
  res.send("Welcome to play-my-playlist REST api");
});

// DB connection codes
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const conn = mongoose.connection;
conn.on("error", console.error.bind(console, "connection error: "));
conn.once("open", function () {
  console.log("DB Connected successfully");
});

const botName = "Playlist Bot";
// Run socket with client connects
io.on("connection", (socket) => {
  // Join room Event
  socket.on(
    "join_room",
    ({ user_id, room_id, name, songs_list, song_count }) => {
      const userExists = getUser(socket.id);
      if (!userExists) {
        const user = addUser({
          id: socket.id,
          user_id,
          room_id,
          name,
          songs_list,
          song_count,
        });
        console.log('join room');
        console.log(user);
        if (user) {
          // Welcome current user
          socket.join(user.room_id);
          // socket.broadcast.emit('user-connected', user.user_id);
          // socket.emit(
          //   "message",
          //   formatMessages(
          //     botName,
          //     null,
          //     `Welcome to this PlayMyPlayList room, ${user.name}.`
          //   )
          // );
          // // Broadcast when any user connects
          // socket.broadcast
          //   .to(user.room_id)
          //   .emit(
          //     "message",
          //     formatMessages(
          //       botName,
          //       null,
          //       `${user.name} joined the PlayMyPlayList room.`
          //     )
          //   );
        }
        // Send users and room Info
        io.to(user.room_id).emit("roomUsers", {
          users: getUsersInRoom(user.room_id),
        });
      }
    }
  );

  // Recieve Chat messages
  socket.on("chat_message", ({ user_id, room_id, name, message }) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room_id).emit(
        "message",
        formatMessages(name, user_id, message)
      );
    }
  });

  // Get all songs of the room for game
  socket.on("request_song_details", ({ room_id }) => {
    const user = getUser(socket.id);
    const roomData = getSongsDetails(room_id);
    console.log("request_song_details")
    console.log(user)
    if (user) {
      console.log(user)
      io.to(user.room_id).emit("get_room_details", roomData);
    }
  });

  // Check game status
  socket.on("start_game", () => {
  // socket.on("start_game", ({ room_data, room_players }) => {
    const user = getUser(socket.id);
    console.log('user outside loop');
    console.log(user);
    if (user) {
      console.log('user exists');
      io.to(user.room_id).emit("gameStatus", {
        game_status: true,
        // room_data,
        // room_players,
        // users: getUsersInRoom(user.room_id),
      });
    }
  });

  //Listen to add songs event
  socket.on("add_songs", ({ name, new_song }) => {
    const user = getUser(socket.id);
    if (user) {
      // Update user songs list and count function call
      addUserSong(socket.id, new_song);
      io.to(user.room_id).emit(
        "message",
        formatMessages(botName, null, `${name} added new song.`)
      );
      io.to(user.room_id).emit("roomUsers", {
        users: getUsersInRoom(user.room_id),
      });
    }
  });

  socket.on("send-random-song", ({ room_id, song_details }) => {
    // console.log(song_details);
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room_id).emit("recieve-song", {
        song_details,
      });
    }
  })
    
  socket.on("check-votes", ({ room_id, song_id }) => {
    let success, message;
    const user = getUser(socket.id);
    if (user) {
      const all_voted = checkAllVoted(room_id);
      if (!all_voted) {
        success = false;
        message = "All Players have not voted.";
      } else {
        success = true;
        message = "Votes have been submitted.";
        removeVotes(room_id);
        removeVotedSongs(song_id)
      }
      io.to(user.room_id).emit("notification", {
        success,
        message,
        all_voted: success,
      });
      io.to(user.room_id).emit("roomUsers", {
        room_id: user.room_id,
        users: getUsersInRoom(user.room_id),
      });
    }
  });

  socket.on("player-vote", ({ song_details }) => {
    const user = getUser(socket.id);
    if (user) {
      addVotedDetails(socket.id, song_details);
      // Delete the song id from active room details once voted
      // while scoring check if anyone got the answer right or all got wrong
      
      // Send the updated data after adding the voted details of the player
      io.to(user.room_id).emit("roomUsers", {
        room_id: user.room_id,
        users: getUsersInRoom(user.room_id),
      });

      io.to(user.room_id).emit("notification", {
        success: true,
        message: `${user.name} has voted.`,
      });
    }
  })

  // Disconnect event
  socket.on("disconnect", () => {
    let user = getUser(socket.id);
    if (user) {
      // send message to all that user is disconnected
      socket.broadcast
        .to(user.room_id)
        .emit(
            "message",
            formatMessages(botName, null, `${user.name} has left the room.`)
          );
        deletePlayer(user.user_id, user.room_id)
        // Send users and room Info
        user = removeUser(socket.id);
        
        io.to(user.room_id).emit("roomUsers", {
          room_id: user.room_id,
          users: getUsersInRoom(user.room_id),
        });
    }
  });
});

let host = process.env.HOST;
let port = process.env.PORT;

// Node JS server starting code
server.listen(port, () =>
  console.log(`App is listening on http://${host}:${port}...`)
);
