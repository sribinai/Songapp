const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");

const authenticateToken = async (req, res, next) => {
  let token;
  console.log("in authenticate token");
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Set token from cookie
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  // Make sure the token exists
  if (!token) {
    return next(
      res.status(401).json({ message: "Not authorized to access this route" })
    );
    // return next(new Error("Not authorized to access this route", 401));
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await UserModel.findById(decoded.id);

    next();
  } catch (error) {
    return next(
      res.status(401).json({ message: "Not authorized to access this route" })
    );
    // return next(new Error("Not authorized to access this route", 401));
  }
};

module.exports = { authenticateToken };
