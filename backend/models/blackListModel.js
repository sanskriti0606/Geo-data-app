const mongoose = require("mongoose");

// Define the schema for blacklisted tokens
const blackListSchema = new mongoose.Schema({
  blackListToken: { type: String, required: true },
});

// Create the model
const BlackListModel = mongoose.model("BlackListToken", blackListSchema);

module.exports = { BlackListModel };
