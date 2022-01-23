const express = require("express");
const SongController = require("../controllers/songController");

const router = express.Router();

router.post("/add-song", SongController.addSong);
router.post("/delete-song", SongController.deleteSong);
router.post("/get-room-songs", SongController.getRoomSongs);
router.post("/get-player-songs", SongController.getPlayerSongs);
router.post("/get-songbyID", SongController.getPlayerSongs);
router.post("/vote-player", SongController.votePlayer);

module.exports = router;
