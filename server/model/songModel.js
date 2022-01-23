const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  room_id: {
    type: String,
    min: 4,
    required: true,
  },
  player_id: {
    type: String,
    required: true,
  },
  song: {
    type: String,
    required: true,
  },
});

const songModel = mongoose.model("song", SongSchema);

module.exports = songModel;
