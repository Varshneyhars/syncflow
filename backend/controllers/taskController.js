const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, assignedTo, dueDate } = req.body;
        
        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required" });
        }

        const newTask = new Task({ title, description, status, assignedTo, dueDate });
        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        console.error("🔥 Error creating task:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate("assignedTo", "name email");
        res.json(tasks);
    } catch (error) {
        console.error("🔥 Error fetching tasks:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("assignedTo", "name email");
        if (!task) return res.status(404).json({ error: "Task not found" });

        res.json(task);
    } catch (error) {
        console.error("🔥 Error fetching task:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Update a task
exports.updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate if status is provided
        if (!status) {
            return res.status(400).json({ error: "Status is required" });
        }

        // Validate allowed status values
        const validStatuses = ["Pending", "In Progress", "Completed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        // Validate if ID is valid ObjectId
        const mongoose = require("mongoose");
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Task ID" });
        }

        // Find and update task status
        const task = await Task.findByIdAndUpdate(id, { status }, { new: true });

        if (!task) {
            return res.status(404).json({ error: "Task not found in database" });
        }

        res.json({ message: "Task status updated successfully", task });
    } catch (error) {
        console.error("Error updating task status:", error);
        res.status(500).json({ error: "Error updating task status" });
    }
};
// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ error: "Task not found" });

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("🔥 Error deleting task:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};
