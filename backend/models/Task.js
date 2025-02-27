const mongoose = require("mongoose");
const { io } = require('../server'); // Adjust the path as necessary

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    attachments: [{ type: String }] // Add this line
});

TaskSchema.post('save', function(doc) {
    io.emit('taskUpdated', doc);
});

module.exports = mongoose.model("Task", TaskSchema);

