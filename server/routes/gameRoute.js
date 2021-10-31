const express = require("express");
const GameController = require("../controllers/gameController");

const router = express.Router();

router.post("/add-song", GameController.addSong);
router.post("/get-songs", GameController.getSongs);

module.exports = router;
