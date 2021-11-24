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
  getUsersInRoom,
} = require("./utils/users");

// Accessing dotenv variables
dotenv.config({ path: "./config/config.env" });

const logger = require("./middlewares/logger");
const userInfo = require("./routes/userRoute");
const roomInfo = require("./routes/roomRoute");
const gameInfo = require("./routes/gameRoute");

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
  preflightContinue: true,
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
app.use("/playlist/api/game", gameInfo);

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
  // console.log(`New Sockt.IO connection : ${socket.id}`);
  // Join room Event
  socket.on("join_room", (data) => {
    // Welcome current user
    socket.emit(
      "message",
      formatMessages(botName, "Welcome to PlayMyPlayList room.")
    );
    // Broadcast when any user connects
    socket.broadcast.emit(
      "message",
      formatMessages(botName, "New Player joined the room.")
    );
    socket.join(data);
    console.log(
      `User with ID: ${socket.id} joined room. User Name: ${data.name}, Songs: ${data.song_count}`
    );
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
    // send message to all that user is disconnected
    io.emit("message", formatMessages(botName, "A User left the room."));
  });
});

let host = process.env.HOST;
let port = process.env.PORT;

// Node JS server starting code
server.listen(port, () =>
  console.log(`App is listening on http://${host}:${port}...`)
);
