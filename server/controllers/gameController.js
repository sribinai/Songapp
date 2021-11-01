const gameModel = require("../model/gameModel");
const Joi = require("joi");

// Generate random roomID
const addSong = async (req, res) => {
  const { room_id, player_id, song } = req.body;
  try {
    const gameData = await gameModel
      .findOne({ room_id, player_id })
      .select("+songs");
    let songAdded;
    if (gameData.length === 0) {
      // console.log(gameData);
      songAdded = await gameModel.create({ room_id, player_id, songs: [song] });
    } else {
      gameData.songs.push(song);
      songAdded = await gameData.save();
      // console.log(data);
    }
    return res.status(200).json({
      success: true,
      message: "Song has successfully been added.",
      songAdded,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Some error occured in the server." });
  }
};

const getSongs = async (req, res) => {
  const { room_id, player_id } = req.body;
  try {
    const gameData = await gameModel
      .findOne({ room_id, player_id })
      .select("+songs");
    if (gameData.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data exits." });
    }
    return res
      .status(200)
      .json({
        success: true,
        songs: gameData.songs,
        message: "Successfully fetched songs.",
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Some error occurred in server." });
  }
  // res.send({ get: "songs saved" });
};

module.exports = { addSong, getSongs };
