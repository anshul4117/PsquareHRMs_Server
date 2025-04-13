const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  skills: [String],
  resume: String,
  experience: { type: Number ,default: 0 },
  position: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Selected"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
