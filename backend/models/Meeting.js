const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    paruticipants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    schedledTime: { type: Date, required: true },
    notes: { type: String },
    meetingSummary: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Meeting", MeetingSchema);
