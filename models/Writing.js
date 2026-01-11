const mongoose = require("mongoose");

const WritingSchema = new mongoose.Schema({
  userId: String,
  content: String,
  time: Date
});

module.exports = mongoose.model("Writing", WritingSchema);