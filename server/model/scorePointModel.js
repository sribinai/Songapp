const mongoose = require("mongoose");

const ScorePointSchema = new mongoose.Schema({
    room_id: {
      type: String,
      min: 4,
      required: true,
    },
    player_id: {
      type: String,
      required: true,
    },
    points : {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const scorePointModel = mongoose.model("score_point", ScorePointSchema);

module.exports = scorePointModel;
