const Joi = require("joi");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

// check user exists controller
const checkUserExists = async (req, res, next) => {
  const { email } = req.body;
  let message = "";
  // fetch data from Model and check if email exists
  try {
    let userData = await userModel.find({ email });
    console.log(`arrayLength: ${userData.length}`);
    if (userData.length === 0) {
      // user does not exist
      message = "User does not exist.";
      return res.status(400).json({ success: false, message });
    } else {
      message = "User already exists.";
      return res.status(200).json({ success: true, message });
      //   return res.status(200).json({ success: true, data: userData, message });
    }
  } catch (error) {
    message = "Unexpected error occured.";
    return res.status(500).json({ success: false, message });
  }
};

// Create user controller
const createUser = async (req, res, next) => {
  const userInfo = req.body;
  const { email } = req.body;

  let message = "";
  // Schema defination for Validation of details recieved
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(6)
      .required(),
  });
  // Validation of details recieved starts here
  const validate = schema.validate(userInfo);
  const { error } = validate;
  if (error) {
    message = error.details[0].message;
    return res.status(400).json({ success: false, message });
  }
  // Add data to database if does not exist already
  let userData = await userModel.find({ email });
  if (userData.length !== 0) {
    // user does exists
    message = "User already exists";
    return res.status(400).json({ success: false, message });
  } else {
    try {
      // Data is being stored in DB
      const data = await userModel.create(userInfo);
      message = "Your account has been created successfully.";
      return res.status(200).json({ success: true, data, message });
    } catch (error) {
      message = error._message;
      return res.status(500).json({ success: false, message });
    }
  }
};

// Controller to login User
const getUser = async (req, res, next) => {
  const { email, password } = req.body;
  let message = "";
  // Schema defination for Validation of details recieved
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(6)
      .required(),
  });
  // Validation of details recieved starts here
  const validate = schema.validate(req.body);
  const { error } = validate;
  if (error) {
    message = error.details[0].message;
    return res.status(400).json({ success: false, message });
  }
  // Fetch user details if exists
  try {
    let userData = await userModel.find({
      email,
      password,
    });
    if (userData.length === 0) {
      // user does exists
      message = "You have entered invalid credentials.";
      return res.status(400).json({ success: false, message });
    } else {
      // Fetch data from Database
      jwt.sign({ user_id: userData._id }, "playlistKey", (err, token) => {
        res.json({
          token,
        });
      });
      message = "Successfuly fetched User info.";
      return res.status(200).json({ success: true, data: userData, message });
    }
  } catch (error) {
    message = error._message;
    return res.status(500).json({ success: false, message });
  }
};

module.exports = { checkUserExists, createUser, getUser };
