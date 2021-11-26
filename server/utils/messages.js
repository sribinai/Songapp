const moment = require("moment");

const formatMessages = (username, user_id, text) => {
  return {
    username,
    user_id,
    text,
    time: moment().format("h:mm a"),
  };
};

module.exports = { formatMessages };
