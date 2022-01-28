const UserModel = require("../model/userModel");
const RoomModel = require("../model/roomModel");

// fetch Songs of the User
const removePlayer = async (user_id, room_id) => {
  try {
    const roomInfo = await RoomModel.findOne({ room_id });

    let songs = {};
    roomInfo.players.forEach((data) => {
      if (data.player_id === user_id) {
        songs = data;
      }
    });
    // console.log(songs);
    return { data: songs };
  } catch (error) {
    return error;
  }
};

module.exports = { removePlayer };
