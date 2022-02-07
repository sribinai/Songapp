const { deletePlayer } = require('./dbOperations');

const users = [];

const addUser = ({ id, user_id, name, room_id, songs_list, song_count }) => {
  // Check if user exists with same UserID
  const existingUser = users.find(
    (user) => user.room_id === room_id && user.user_id === user_id
  );
  if (existingUser) {
    return { error: "User already exists." };
  }
  // add user to DB if does not exist
  const user = { id, user_id, name, room_id, songs_list, song_count };

  users.push(user);

  return user;
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getSongsDetails = (room_id) => {
  let arrayData = [];
  users.forEach((user) => {
    if (user.room_id === room_id) {
      arrayData.push({
        user_id: user.user_id,
        name: user.name,
        room_id: user.room_id,
        song_count: user.song_count,
      });
    }
  });
  return arrayData;
};

const addVotedDetails = (id, song_details) => {
  // Check if user exists with same UserID
  const user = users.find(
    (user) => user.id === id
  );
  user.song_details = song_details;

  return user;
}

const addUserSong = (id, new_song) => {
  let userIndex;
  users.forEach((user, index) => {
    if (user.id === id) {
      userIndex = index;
    }
  });
  // Add songs and soncount using the user index number
  users[userIndex].songs_list.push(new_song);
  users[userIndex].song_count = users[userIndex].song_count + 1;

  return { user: users[userIndex] };
};

const getUsersInRoom = (room_id) => {
  return users.filter((user) => user.room_id === room_id);
};

const checkAllVoted = (room_id) => {
  let allVotedFlag = true;
  users.forEach((user) => {
    if (user.room_id === room_id) {
      if (!user.song_details) {
        allVotedFlag = false;
      }
    }
  });
  
  return allVotedFlag;
};

const removeVotes = async (room_id) => {
  users.forEach((user) => {
    if (user.room_id === room_id) {
      delete user.song_details;
    }
  });
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  addVotedDetails,
  getSongsDetails,
  getUsersInRoom,
  addUserSong,
  checkAllVoted,
  removeVotes,
};
