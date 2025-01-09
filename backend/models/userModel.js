const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    GeoJSONData: { type: Array, default: [] }, // Array to store GeoJSON data
  },
  { versionKey: false }
);

const UserModel = mongoose.model("user", userSchema); // User Model

module.exports = { UserModel };
