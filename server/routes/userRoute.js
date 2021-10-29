const express = require("express");
const UserController = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/check-user-exists",
  authenticateToken,
  UserController.checkUserExists
);
router.post("/sign-up", UserController.createUser);
router.post("/login", UserController.loginUser);

module.exports = router;
