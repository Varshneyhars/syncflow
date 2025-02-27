const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Create a task
router.post("/", taskController.createTask);

// Get all tasks
router.get("/", taskController.getAllTasks);

// Get a single task by ID
router.get("/:id", taskController.getTaskById);

// Update a task
// Update only the status of a task
router.put("/:id/status", taskController.updateTaskStatus);

// Delete a task
router.delete("/:id", taskController.deleteTask);

module.exports = router;
