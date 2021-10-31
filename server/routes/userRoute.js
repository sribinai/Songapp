const express = require("express");
const authController = require("../controllers/authUser");
const UserController = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

router.get("/get-data", authenticateToken, authController.getData);
router.get("/get-user-data", authenticateToken, authController.getUserData);
router.post(
  "/check-user-exists",
  authenticateToken,
  UserController.checkUserExists
);
router.post("/sign-up", UserController.createUser);
router.post("/login", UserController.loginUser);

module.exports = router;
