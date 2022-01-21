const gameModel = require("../model/gameModel");
const Joi = require("joi");

// Generate random roomID
const addSong = async (req, res) => {
  const { room_id, player_id, song } = req.body;
  try {
    const gameData = await gameModel
      .find({ room_id })
      .select("+song +player_id");
    const songsCount = await gameModel
      .where({ room_id: room_id, player_id: player_id })
      .count();
    // Cannot add songs more than 5 songs
    if (songsCount + 1 > 5) {
      return res.status(400).json({
        success: false,
        message: "You can add only 5 songs.",
      });
    }
    let songAdded,
      songExists = false,
      ownSong = false;
    if (gameData.length === 0) {
      songAdded = await gameModel.create({ room_id, player_id, song });
    } else {
      gameData.forEach((item) => {
        if (item.song === song) {
          if (item.player_id === player_id) {
            ownSong = true;
          } else {
            songExists = true;
          }
        }
      });
      if (ownSong === true) {
        return res.status(400).json({
          success: false,
          message: "You have already added the song.",
        });
      } else if (songExists === true) {
        return res.status(400).json({
          success: false,
          message: "Song has already been added by someone in the room.",
        });
      } else {
        songAdded = await gameModel.create({ room_id, player_id, song });
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
  const { song_id, player_id } = req.body;
  try {
    const songData = await gameModel.findOne({ _id: song_id });
    if (songData === null) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Can't find the song you are looking for.",
        });
    } else if (player_id !== songData.player_id) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Only the owner can delete the song.",
        });
    } else {
      // const deleteSong = await gameModel.findOneAndUpdate({ room_id, player_id }, { songs: songsArray });
      const deletedSong = await gameModel.findByIdAndRemove({ _id: song_id });
      return res
        .status(200)
        .json({
          success: true,
          message: "Song has been deleted.",
          deletedSong,
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

const getRoomSongs = async (req, res) => {
  const { room_id } = req.body;
  try {
    const songsData = await gameModel.find({ room_id });
    const songsCount = await gameModel.where({ room_id: room_id }).count();
    return res
      .status(200)
      .json({
        success: true,
        message: `Successfully fetched songs of room: ${room_id} .`,
        songsCount,
        songsData,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

const getPlayerSongs = async (req, res) => {
  const { room_id, player_id } = req.body;
  try {
    const gameData = await gameModel.find({ room_id, player_id });
    const songsCount = await gameModel
      .where({ room_id: room_id, player_id: player_id })
      .count();
    if (gameData.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Player hasn't added any songs." });
    } else {
      return res.status(200).json({
        success: true,
        message: "Successfully fetched all songs.",
        songsCount: songsCount,
        songsData: gameData,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Some error occurred in server." });
  }
};

module.exports = { addSong, deleteSong, getRoomSongs, getPlayerSongs };
