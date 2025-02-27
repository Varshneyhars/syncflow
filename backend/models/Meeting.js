const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    scheduledTime: { type: Date, required: true },
    notes: { type: String },
    meetingSummary: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Meeting", MeetingSchema);
