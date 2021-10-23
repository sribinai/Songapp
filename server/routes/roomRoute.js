const express = require("express");
const roomModel = require("../model/roomModel");
const Joi = require("joi");

const router = express.Router();
// route to create random roomID
router.get("/createRoomID", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  let roomID = createRoomId();
  let roomData = await roomModel.find({ room_id: roomID });
  try {
    // console.log(`arrayLength: ${roomData.length}`);
    while (roomData.length !== 0) {
      // check if roomData exists in collection roomdatas reset to some other roomID
      roomID = createRoomId();
      roomData = await roomModel.find({ room_id: roomID });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
  res.send({ roomID });
});
// route to add roomDetails
router.post("/createRoom", async (req, res) => {
  const roomInfo = req.body;
  let output = {};
  // Schema defination for Validation of details recieved
  const schema = Joi.object({
    room_id: Joi.string().alphanum().min(4).required(),
    host_name: Joi.string().min(3).required(),
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
    return res.status(500).send(error);
  }
  // If Data if fetched successfully send success status with data and message
  output.roomInfo = roomData;
  output.status = "success";
  output.message = "You have successfully created the room.";
  // console.log(output);
  res.json(output);
});

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

module.exports = router;
