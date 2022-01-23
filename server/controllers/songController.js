const songModel = require("../model/songModel");
const scorePointModel = require("../model/scorePointModel");
const Joi = require("joi");

// Generate random roomID
const addSong = async (req, res) => {
  const { room_id, player_id, song } = req.body;
  try {
    const gameData = await songModel
      .find({ room_id })
      .select("+song +player_id");
    const songsCount = await songModel
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
      songAdded = await songModel.create({ room_id, player_id, song });
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
        songAdded = await songModel.create({ room_id, player_id, song });
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
    const songData = await songModel.findOne({ _id: song_id });
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
      // const deleteSong = await songModel.findOneAndUpdate({ room_id, player_id }, { songs: songsArray });
      const deletedSong = await songModel.findByIdAndRemove({ _id: song_id });
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
    const songsData = await songModel.find({ room_id });
    const songsCount = await songModel.where({ room_id: room_id }).count();
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
    const gameData = await songModel.find({ room_id, player_id });
    const songsCount = await songModel
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

// Route for voting a particular player
const votePlayer = async (req, res) => {
  const { room_id, song_id, voted_player_id, player_id } = req.body;
  try {
    const songData = await songModel.find({ _id: song_id });
    // Check the player cannot themselves
    if (voted_player_id === player_id) {
      return res
      .status(400)
      .json({ success: false, message: "You cannot vote yourself." });
    }

    let points = 0;
    // console.log(songData);
    
    let scoreDetails = await scorePointModel.find({ room_id, player_id });
    let scoreData;
    console.log(scoreDetails);
    if (scoreDetails.length === 0) {
      if (songData[0].player_id === voted_player_id) {
        // If voted person is right 10 points
        points = 10;
      }
      scoreData = await scorePointModel.create({
        room_id,
        scores: {
          player_id,
          points,
        },
      });
    } else {
      if (songData[0].player_id === voted_player_id) {
        // If voted person is right 10 points
        points = scoreDetails[0].scores.points + 10;
      } else {
        // If voted person is wrong 0 ponits
        points = scoreDetails[0].scores.points;
      }
      console.log(points);
      // if (songData.player_id === voted_player_id) {
      //   // If voted person is right 10 points
      //   points = 10;
      // }
      // // changes to points if game has already started
      scoreData = await scorePointModel.findOneAndUpdate({ room_id, player_id }, { $set: { points } })
      console.log(scoreData);
    }
    // while scoring check if anyone got the answer right or all got wrong
    return res
    .status(200)
    .json({ success: true, message: "Vote Player success." });
  } catch (error) {
    return res
    .status(500)
    .json({ success: false, message: "Some error occurred in server." });
  }
};

module.exports = { addSong, deleteSong, getRoomSongs, getPlayerSongs, votePlayer };
