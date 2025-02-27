const express = require("express");
const Task = require("../models/Task");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Create Task (Only Admin/Manager)
router.post("/create", authMiddleware, roleMiddleware(["Admin", "Manager"]), async (req, res, next) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.json(task);
    } catch (err) {
        next(err);
    }
});

// Get All Tasks (Authenticated Users)
router.get("/", authMiddleware, async (req, res, next) => {
    try {
        const tasks = await Task.find().populate("assignedTo");
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
