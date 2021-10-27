const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Accessing dotenv variables
dotenv.config({ path: "./config/config.env" });
let host = process.env.HOST;
let port = process.env.PORT;

const logger = require("./middlewares/logger");
const roomInfo = require("./routes/roomRoute");
const userInfo = require("./routes/userRoute");

const app = express();

app.use(logger); // Middleware to log in the server console
app.use(function (req, res, next) {
  // Headers to remove possible errors in all requests
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  next();
});
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/playlist/api/room", roomInfo);
app.use("/playlist/api/user", userInfo);

app.get("/", (req, res) => {
  res.send("Welcome to play-my-playlist REST api");
  // res.send('{ "Node JS", "/playlist/api" }');
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

app.listen(port, () => console.log(`App is listening on ${host}:${port}...`));
