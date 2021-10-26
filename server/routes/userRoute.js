const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

router.post("/checkUserExists", UserController.checkUserExists);
router.post("/createUser", UserController.createUser);
router.post("/getUser", UserController.getUser);

module.exports = router;
