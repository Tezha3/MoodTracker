const mongoose = require("mongoose");

const journalsSchema = new mongoose.Schema({
  title: { type: String, required: true }, // For the user's feeling
  content: { type: String, required: true }, // For the description of the feeling
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Journal", journalsSchema);
