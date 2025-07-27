const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  difficulty: String,
  type: String,
  description: String,
});

module.exports = mongoose.model("Course", courseSchema);
