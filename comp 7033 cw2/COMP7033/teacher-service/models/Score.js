const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
});

module.exports = mongoose.model("Score", scoreSchema);
