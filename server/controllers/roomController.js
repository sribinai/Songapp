const roomModel = require("../model/roomModel");
const gameModel = require("../model/gameModel");
const Joi = require("joi");

// Generate random roomID
const createRoomID = async (req, res) => {
  let roomID = createRoomId();
  try {
    let roomData = await roomModel.find({ room_id: roomID });
    // console.log(`arrayLength: ${roomData.length}`);
    while (roomData.length !== 0) {
      // check if roomData exists in collection roomdatas reset to some other roomID
      roomID = createRoomId();
      roomData = await roomModel.find({ room_id: roomID });
    }
  } catch (error) {
    return res.status(500).send(error._message);
  }
  res.send({ roomID });
};

// route to add roomDetails
const createRoom = async (req, res) => {
  const roomInfo = req.body;
  let output = {};
  // Schema defination for Validation of details recieved
  const schema = Joi.object({
    room_id: Joi.string().alphanum().min(4).required(),
    host_id: Joi.string().min(3).required(),
    room_name: Joi.string().min(4).max(20).required(),
    no_of_players: Joi.number().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(6)
      .required(),
    room_rules: Joi.string().allow("").optional().max(300),
  });
  // Validation of details recieved starts here
  const validate = schema.validate(roomInfo);
  const { error } = validate;
  if (error) {
    output.status = "error";
    output.message = error.details[0].message;
    return res.status(400).send(output);
  }
  // Data is being stored in DB
  const roomData = new roomModel(req.body);
  try {
    await roomData.save();
  } catch (error) {
    output.status = "error";
    output.message = error._message;
    // output.message = error.message;
    return res.status(500).send(output);
  }
  // If Data if fetched successfully send success status with data and message
  output.roomInfo = roomData;
  output.status = "success";
  output.message = "You have successfully created the room.";
  res.json(output);
};

// Check RoomID exists or NOT
const checkRoom = async (req, res) => {
  const { roomID } = req.body;
  let output = {};
  output.roomID = roomID;
  try {
    let dbRoomID = await roomModel.find({ room_id: roomID });
    if (dbRoomID.length === 0) {
      // Room does not exist
      output.status = "error";
      output.message = "Room server does not exist.";
    } else {
      // Room exists
      output.status = "success";
      output.message = "Room server exists.";
    }
  } catch (error) {
    output.status = "error";
    output.message = error._message;
    return res.status(500).send(output);
  }
  res.send(output);
};

// Route for Joining a particular room
const joinRoom = async (req, res) => {
  const { room_id, password, player_id } = req.body;
  let output = {};
  // Schema defination for Validation of details recieved
  const schema = Joi.object({
    room_id: Joi.string().alphanum().min(4).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(6)
      .required(),
  });
  // Validation of details recieved for join room starts here
  const validate = schema.validate({ room_id, password });
  const { error } = validate;
  if (error) {
    output.status = "error";
    output.message = error.details[0].message;
    return res.status(400).send(output);
  }
  try {
    let dbJoinRoom = await roomModel.findOne({ room_id }).select("+password");
    // console.log(dbJoinRoom);

    if (!dbJoinRoom) {
      message = "Room does not exist with this roomID.";
      return res.status(401).json({ success: false, message });
    }
    // Check if password matches
    const isMatch = await dbJoinRoom.matchPassword(password);
    if (!isMatch) {
      message = "You have entered wrong password.";
      return res.status(401).json({ success: false, message });
    }
    // Adding new players joining room in
    let players = [...dbJoinRoom.players];
    if (players.length !== 0) {
      let exist = false;
      // Check for each item if the id already there in document
      players.forEach((item) => {
        if (item === player_id) exist = true;
      });
      // If player Id does not already exist in array push it in players array and save it in document
      if (!exist) {
        if (dbJoinRoom.no_of_players > players.length) {
          message = "Player limit exeeded.";
          return res.status(501).json({ success: false, message });
        }
        players.push(player_id);
        dbJoinRoom.players = players;
        await dbJoinRoom.save();
      }
    }

    output.roomInfo = dbJoinRoom;
    // when join room is successful add document the games collection if not created already
    const playersData = await gameModel.find({ room_id });
    if (playersData.length === 0) {
      await gameModel.create({ room_id, player_id });
    }
  } catch (error) {
    output.status = "error";
    output.message = error._message;
    return res.status(500).send(output);
  }
  output.status = "success";
  output.message = "Successfully joined into the room.";
  res.send(output);
};

// Get room Details
const getRoomDetails = async (req, res) => {
  const { room_id } = req.body;
  let output;
  try {
    let roomDetails = await roomModel.findOne({ room_id }).select("-password");
    console.log(roomDetails);
  } catch (error) {
    output.status = "error";
    output.message = error._message;
    return res.status(500).send(output);
  }
  output.roomDetails = roomDetails;
  output.status = "success";
  output.message = "Successfully joined into the room.";
  res.send(output);
};

// Function to create a random roomID
function createRoomId() {
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
  let lengthOfCode = 6;
  let newCode = "";
  for (let i = 0; i < lengthOfCode; i++) {
    let rnum = Math.floor(Math.random() * characters.length);
    newCode += characters.substring(rnum, rnum + 1);
  }
  return newCode;
}

module.exports = {
  createRoomID,
  createRoom,
  checkRoom,
  joinRoom,
  getRoomDetails,
};
