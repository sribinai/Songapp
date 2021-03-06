const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Set token from Bearer token in header
      token = req.headers.authorization.split(" ")[1];
      // Set token from cookie
    } else if (req.cookies.playlist_token) {
      token = req.cookies.playlist_token;
    }
    // Make sure the token exists
    if (!token) {
      return next(
        res
          .status(401)
          .json({ auth: false, message: "Not authorized to access this route" })
      );
      // return next(new Error("Not authorized to access this route", 401));
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.tokenData = { id: decoded.id, user_name: decoded.user_name };

    return next();
  } catch (error) {
    return next(
      res.status(401).json({
        auth: false,
        message: "Oops...!! Not authorized to access this route",
      })
    );
  }
};

module.exports = { authenticateToken };
