const UserModel = require("../model/userModel");
const RoomModel = require("../model/roomModel");


const playerJoinRoom = async (user_id, room_id) => {
  
}

const removePlayer = async (user_id, room_id) => {
  try {
    const roomInfo = await RoomModel.findOne({ room_id });

    let players = roomInfo.players;
    console.log(roomInfo)
    console.log(players)
    const index = players.findIndex((player) => player === user_id);
    players.splice(index, 1)[0];
    
    await RoomModel.findOneAndUpdate({ room_id }, {$set:{ players }}, { new: true });
    console.log(players)
    console.log(roomInfo)

    return { data: roomInfo };
  } catch (error) {
    return error;
  }
};

module.exports = { removePlayer };
