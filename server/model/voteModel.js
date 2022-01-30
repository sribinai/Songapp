const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  room_id: {
    type: String,
    min: 4,
    required: true,
  },
  player_id: {
    type: String,
    required: true,
  },
  voted_player_id : {
    type: String,
    required: true,
  },
  song_id : {
    type: String,
    required: true,
  },
});

const voteModel = mongoose.model("vote", VoteSchema);

module.exports = voteModel;
