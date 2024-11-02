const mongoose = require("mongoose");

const moodsSchema = new mongoose.Schema({
  feeling: { type: String, required: true }, // For the user's feeling
  description: { type: Array, required: true }, // For the description of the feeling
  impact: { type: String, required: true }, // For the impact on mood
  optionalDescription: { type: String }, // Optional: Additional description of the impact
  date: { type: Date, default: Date.now }, // Optional: Automatically set the date when the mood is logged
});

module.exports = mongoose.model("Mood", moodsSchema);
