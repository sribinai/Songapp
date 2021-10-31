const Joi = require("joi");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");
// const mailgun = require("mailgun-js");

// check user exists controller
const checkUserExists = async (req, res, next) => {
  const { email } = req.body;
  let message = "";
  // fetch data from Model and check if email exists
  try {
    let userData = await UserModel.find({ email });
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
  let userData = await UserModel.find({ email });
  if (userData.length !== 0) {
    // user does exists
    message = "User already exists";
    return res.status(400).json({ success: false, message });
  } else {
    try {
      // Data is being stored in DB
      const data = await UserModel.create(userInfo);
      // Mailgun code starts to verify email address
      // const mg = mailgun({
      //   apiKey: process.env.MAILGUN_APIKEY,
      //   domain: process.env.MAILGUN_DOMAIN,
      // });
      // let activate_token = jwt.sign(userInfo, process.env.JWT_ACC_ACTIVATE, {
      //   expiresIn: "20m",
      // });
      // const emailData = {
      //   from: "postmaster@sandboxfb72a17b4db84eb0bc70e636d3710af3.mailgun.org",
      //   // from: "godsy6462@gmail.com",
      //   // from: "Excited User <me@samples.mailgun.org>",
      //   to: `godsonemmanuel07@gmail.com`,
      //   subject: "Hello",
      //   // text: "Testing some Mailgun awesomeness!",
      //   html: `
      //       <h2>Please click on given link to activate your account</h2>
      //       <p>${process.env.CLIENT_URL}/authentication/activate/${activate_token}</p>`,
      // };
      // mg.messages().send(emailData, (error, body) => {
      //   if (error) {
      //     return res.json({
      //       message: error.message,
      //     });
      //   }
      //   // message = "User account has been created successfully.";
      //   return res.status(200).json({
      //     success: true,
      //     emailData,
      //     data,
      //     message: "Activation Email has been sent",
      //   });
      // });
      // return res.status(200).json({ success: true, data, message });
      message = "User account has been created successfully.";
      return res.status(200).json({ success: true, data, message });
    } catch (error) {
      message = error.message;
      return res.status(500).json({ success: false, message });
    }
  }
};

// Controller to login User
const loginUser = async (req, res, next) => {
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

  // Testing STARTS here
  try {
    const user = await UserModel.findOne({ email }).select("+password");
    // If user does not exist
    if (!user) {
      message = "Account does not exist with this emailID.";
      return res.status(401).json({ success: false, message });
    }
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      message = "You have entered wrong password.";
      return res.status(401).json({ success: false, message });
    }
    message = "Successfuly fetched User info.";
    const token = jwt.sign(
      { id: user._id, user_name: user.name },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    return res.status(200).json({ success: true, token, message });
  } catch (error) {
    message = error._message;
    return res.status(500).json({ success: false, message });
  }
};

module.exports = { checkUserExists, createUser, loginUser };
