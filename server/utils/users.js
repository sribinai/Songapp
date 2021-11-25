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
  // console.log(`User ID: ${user_id} does not exist.`);
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

const getUsersInRoom = (room_id) => {
  return users.filter((user) => user.room_id === room_id);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
