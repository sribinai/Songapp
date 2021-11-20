const express = require("express");
const RoomController = require("../controllers/roomController");

const router = express.Router();

router.get("/createRoomID", RoomController.createRoomID);
router.post("/createRoom", RoomController.createRoom);
router.post("/checkRoom", RoomController.checkRoom);
router.post("/joinRoom", RoomController.joinRoom);
router.post("/getRoomDetails", RoomController.getRoomDetails);

module.exports = router;
