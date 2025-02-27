const mongoose = require("mongoose");

const AISummarySchema = new mongoose.Schema({
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
    summary: { type: String, required: true },
    generatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AISummary", AISummarySchema);
