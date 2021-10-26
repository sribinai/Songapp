const { response } = require("express");
const express = require("express");
const Joi = require("joi");
const userModel = require("../model/userModel");

const router = express.Router();

// Check if user exists or not
router.post("/checkUserExists", async (req, res) => {
  const { user_email } = req.body;
  let output = {};
  // fetch data from Model and check if email exists
  try {
    let userData = await userModel.find({ user_email: user_email });
    console.log(`arrayLength: ${userData.length}`);
    if (userData.length === 0) {
      // user does not exist
      output.status = "error";
      output.message = "User does not exist.";
    } else {
      // console.log(userData);
      output.status = "success";
      output.message = "User does exists.";
    }
  } catch (error) {
    return res.status(500).send(error._message);
  }
  res.send(output);
});

router.post("/createUser", async (req, res) => {
  const userInfo = req.body;
  const { email } = req.body;
  let output = {}; // To send response to user
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  // Validate input data
  const validate = schema.validate(userInfo);
  const { error } = validate;
  if (error) {
    output.status = "error";
    output.message = error.details[0].message;
    return res.status(400).send(output);
  }
  // If valididation is OK, we need to add it to database
  let userData = await userModel.find({ email });
  console.log(userData);
  res.send(userInfo);
});

router.post("/getUser", async (req, res) => {
  const userInfo = req.body;
  res.send(userInfo);
});

module.exports = router;
