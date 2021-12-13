const gameModel = require("../model/gameModel");
const Joi = require("joi");

// Generate random roomID
const addSong = async (req, res) => {
  const { room_id, player_id, song } = req.body;
  try {
    const gameData = await gameModel
      .findOne({ room_id, player_id })
      .select("+songs");
    let songAdded,
      songExists = false;
    if (gameData.length === 0) {
      songAdded = await gameModel.create({ room_id, player_id, songs: [song] });
    } else {
      gameData.songs.forEach((item) => {
        if (item === song) {
          songExists = true;
        }
      });
      if (songExists === true) {
        return res.status(400).json({
          success: false,
          message: "Song has already been added.",
        });
      } else {
        gameData.songs.push(song);
        songAdded = await gameData.save();
      }
    }
    return res.status(200).json({
      success: true,
      message: "Song has successfully been added.",
      songAdded,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Some error occured in the server." });
  }
};

const deleteSong = async (req, res) => {
  const { song, room_id, player_id } = req.body;
  try {
    const songData = await gameModel
      .findOne({ room_id, player_id })
      .select(['songs']);
    let songsArray = songData.songs;
    songData.songs.forEach((songItem, index) => {
      if (songItem === song) {
        songsArray.splice(index, 1);
      }
    });
    const deleteSong = await gameModel.findOneAndUpdate({ room_id, player_id }, { songs: songsArray });
    return res.status(200).json({ success: true, message: "Song has been deleted." })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong." })
  }
}

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
    return res.status(200).json({
      success: true,
      songsData: gameData.songs,
      message: "Successfully fetched songs data.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Some error occurred in server." });
  }
};

module.exports = { addSong, deleteSong, getSongs };
