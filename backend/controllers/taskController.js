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
exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedTask) return res.status(404).json({ error: "Task not found" });

        res.json(updatedTask);
    } catch (error) {
        console.error("🔥 Error updating task:", error.message);
        res.status(500).json({ error: "Server error" });
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
