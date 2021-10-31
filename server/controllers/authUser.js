const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");

const getData = async (req, res) => {
  // console.log(tokenData);
  // console.log(res.req.rawHeaders);
  res.json({
    auth: true,
    data: req.tokenData,
    message: "Successfully fetched User data.",
  });
};

const getUserData = async (req, res) => {
  try {
    let tokenData = req.tokenData;
    userInfo = await UserModel.findById(tokenData.id);
    return res.json({
      success: true,
      userInfo,
      message: "Successfully fetched User data.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch user data." });
  }
};

module.exports = { getData, getUserData };
