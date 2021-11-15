const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// Accessing dotenv variables
dotenv.config({ path: "./config/config.env" });

const logger = require("./middlewares/logger");
const userInfo = require("./routes/userRoute");
const roomInfo = require("./routes/roomRoute");
const gameInfo = require("./routes/gameRoute");

const app = express();

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

let host = process.env.HOST;
let port = process.env.PORT;
app.listen(port, () =>
  console.log(`App is listening on http://${host}:${port}...`)
);
