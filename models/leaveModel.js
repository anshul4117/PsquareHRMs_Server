const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  employee: { type: String, required: true },
  reason: String,
  startDate: Date,
  status: { type: String, enum: ["Pending", "Approved"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Leave", leaveSchema);
