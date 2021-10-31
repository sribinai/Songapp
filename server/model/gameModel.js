const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  room_id: {
    type: String,
    min: 4,
    required: true,
  },
  player_id: {
    type: String,
    required: true,
  },
  songs: {
    type: [String],
    required: true,
  },
});

const gameModel = mongoose.model("game", GameSchema);

module.exports = gameModel;
