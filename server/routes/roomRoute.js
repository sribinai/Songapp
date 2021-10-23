const express = require("express");
const Joi = require("joi");

const router = express.Router();
// route to create random roomID
router.get("/createRoomID", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const roomID = createRoomId();
  res.send({ roomID });
});
// route to add roomDetails
router.post("/createRoom", (req, res) => {
  const roomInfo = req.body;
  let output = {};
  const schema = Joi.object({
    room_id: Joi.string().alphanum().min(4).required(),
    host_name: Joi.string().min(3).required(),
    room_name: Joi.string().alphanum().min(4).max(20).required(),
    no_of_players: Joi.number().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(6)
      .required(),
    room_rules: Joi.string().allow("").optional().max(300),
  });

  const validate = schema.validate(roomInfo);
  const { error } = validate;
  if (error) {
    output.status = "Failed";
    output.message = error.details[0].message;
    return res.status(400).send(output);
  }

  output.roomInfo = roomInfo;
  output.status = "Success";
  output.message = "Successfully created room";
  console.log(output);
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
