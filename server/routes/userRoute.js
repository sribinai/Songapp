const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

router.post("/check-user-exists", UserController.checkUserExists);
router.post("/sign-up", UserController.createUser);
router.post("/login", UserController.loginUser);

module.exports = router;
