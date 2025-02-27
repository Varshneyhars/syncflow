const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

router.post("/create", async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

router.get("/", async (req, res) => {
    const tasks = await Task.find().populate("assignedTo");
    res.json(tasks);
});

module.exports = router;
