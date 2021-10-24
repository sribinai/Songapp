const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      min: 4,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
    },
    user_password: {
      type: String,
      min: [6, "Please choose more secure password atleast 6 characters."],
      required: true,
    },
    // created_at: {
    //   type: new Date(),
    //   // type: { type: Date, default: Date.now },
    // },
  },
  { timestamps: true }
);

const userInfo = mongoose.model("userData", UserSchema);

module.exports = userInfo;
