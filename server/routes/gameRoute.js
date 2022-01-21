const express = require("express");
const GameController = require("../controllers/gameController");

const router = express.Router();

router.post("/add-song", GameController.addSong);
router.post("/delete-song", GameController.deleteSong);
router.post("/get-room-songs", GameController.getRoomSongs);
router.post("/get-player-songs", GameController.getPlayerSongs);

module.exports = router;
