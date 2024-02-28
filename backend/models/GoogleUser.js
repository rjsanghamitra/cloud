const mongoose = require("mongoose");

const GoogleUserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
  },
  { timestamps: true }
);

const GoogleUser = mongoose.model("GoogleUser", GoogleUserSchema);
module.exports = GoogleUser;