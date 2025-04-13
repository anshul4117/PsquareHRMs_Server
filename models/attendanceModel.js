const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  employeeName: { type: String, required: true },
  date: { type: Date, required: true },
  task: { type: String,default: "Dashboard Home page Alignment" },
  status: { type: String, enum: ["Present", "Absent"], default: "Present" },
  position: { type: String },
  department: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
