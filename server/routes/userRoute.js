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
  const { user_email } = req.body;
  let output = {};
  // Schema defination for Validation of details recieved
  const schema = Joi.object({
    user_name: Joi.string().min(4).required(),
    user_email: Joi.string().email().required(),
    user_password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(6)
      .required(),
  });
  // Validation of details recieved starts here
  const validate = schema.validate(userInfo);
  const { error } = validate;
  if (error) {
    output.status = "error";
    output.message = error.details[0].message;
    return res.status(400).send(output);
  }
  // Add data to database if does not exist already
  try {
    let userData = await userModel.find({ user_email: user_email });
    // console.log(`arrayLength: ${userData.length}`);
    if (userData.length !== 0) {
      // user does exists
      output.status = "error";
      output.message = "User already exists";
      return res.status(400).send(output);
    } else {
      // Data is being stored in DB
      userData = new userModel(userInfo);
      await userData.save();
      output.userInfo = userData;
      output.status = "success";
      output.message = "Your account has been created successfully.";
    }
  } catch (error) {
    output.status = "error";
    output.message = error._message;
    return res.status(500).send(output);
  }
  res.send(output);
});

router.post("/getUser", async (req, res) => {
  const userInfo = req.body;
  const { user_email, user_password } = req.body;
  let output = {};
  // Schema defination for Validation of details recieved
  const schema = Joi.object({
    user_email: Joi.string().email().required(),
    user_password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(6)
      .required(),
  });
  // Validation of details recieved starts here
  const validate = schema.validate(userInfo);
  const { error } = validate;
  if (error) {
    output.status = "error";
    output.message = error.details[0].message;
    return res.status(400).send(output);
  }
  // Fetch user details if exists
  try {
    let userData = await userModel.find({
      user_email: user_email,
      user_password: user_password,
    });
    // console.log(`arrayLength: ${userData.length}`);
    if (userData.length === 0) {
      // user does exists
      output.status = "error";
      output.message = "You have entered invalid credentials.";
      return res.status(400).send(output);
    } else {
      // Fetch data from Database
      output.userInfo = userData;
      output.status = "success";
      output.message = "Successfuly fetched User info.";
    }
  } catch (error) {
    output.status = "error";
    output.message = error._message;
    return res.status(500).send(output);
  }
  res.send(output);
});

module.exports = router;
