const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Create a Task
router.post("/", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: "Error creating task" });
    }
});

// Get All Tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find().populate("assignedTo", "name email");
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Error fetching tasks" });
    }
});

module.exports = router;
