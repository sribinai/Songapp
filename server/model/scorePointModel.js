const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  player_id: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const ScorePointSchema = new mongoose.Schema({
  room_id: {
    type: String,
    min: 4,
    required: true,
  },
  // scores : {
  //   type: ScoreSchema,
  //   required: false,
  // },
  scores : [ScoreSchema],
});

const scorePointModel = mongoose.model("score_point", ScorePointSchema);

module.exports = scorePointModel;
